import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  pickJevCandidatePool,
  rankPokemonPoolWithJev,
} from "@/lib/jev-rank-pokemon";
import type { PokemonIndex } from "@/lib/pokemon-types";
import { shouldUseJev } from "@/lib/search-query";
import { searchPokemon } from "@/lib/search";
import { getTypesafeApiKey } from "@/lib/typesafe";

let cachedIndex: PokemonIndex | null = null;

async function loadIndex(): Promise<PokemonIndex> {
  if (cachedIndex) return cachedIndex;
  const file = path.join(process.cwd(), "data", "pokemon-index.json");
  const raw = await readFile(file, "utf-8");
  cachedIndex = JSON.parse(raw) as PokemonIndex;
  return cachedIndex;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  const index = await loadIndex();
  const lexical = searchPokemon(index.pokemon, q);
  let results = lexical;
  let rankedBy: "lexical" | "jev" = "lexical";

  const apiKey = getTypesafeApiKey();
  const trimmed = q.trim();
  if (apiKey && trimmed && shouldUseJev(q, lexical.length)) {
    const pool = pickJevCandidatePool(lexical, index.pokemon);
    const { ranked, scores } = await rankPokemonPoolWithJev(trimmed, pool);
    if (scores.size > 0 && ranked.length > 0) {
      results = ranked;
      rankedBy = "jev";
    }
  }

  return NextResponse.json({
    count: results.length,
    rankedBy,
    jevAvailable: Boolean(apiKey),
    pokemon: results,
  });
}
