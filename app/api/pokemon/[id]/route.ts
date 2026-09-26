import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { loadPokemonDetailsFile } from "@/lib/load-pokemon-details";
import type { PokemonIndex } from "@/lib/pokemon-types";

let cachedIndex: PokemonIndex | null = null;

async function loadIndex(): Promise<PokemonIndex> {
  if (cachedIndex) return cachedIndex;
  const file = path.join(process.cwd(), "data", "pokemon-index.json");
  const raw = await readFile(file, "utf-8");
  cachedIndex = JSON.parse(raw) as PokemonIndex;
  return cachedIndex;
}

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id: idParam } = await context.params;
  const id = Number.parseInt(idParam, 10);
  if (!Number.isFinite(id) || id < 1) {
    return NextResponse.json({ error: "Invalid Pokémon id" }, { status: 400 });
  }

  const [index, detailsFile] = await Promise.all([
    loadIndex(),
    loadPokemonDetailsFile(),
  ]);

  const entry = index.pokemon.find((p) => p.id === id);
  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const battle = detailsFile.byId[String(id)];
  if (!battle) {
    return NextResponse.json({ error: "Details missing" }, { status: 404 });
  }

  return NextResponse.json({
    id: entry.id,
    name: entry.name,
    types: entry.types,
    generation: entry.generation,
    color: entry.color,
    height: entry.height,
    weight: entry.weight,
    sprite: entry.sprite,
    stats: battle.stats,
    levelUpMoves: battle.levelUpMoves,
    tmMoves: battle.tmMoves,
    eggMoves: battle.eggMoves,
    tutorMoves: battle.tutorMoves,
    abilities: battle.abilities,
    eggGroups: battle.eggGroups,
    genera: battle.genera,
    flavorText: battle.flavorText,
    shape: battle.shape,
    habitat: battle.habitat,
    baseExperience: battle.baseExperience,
    genderRate: battle.genderRate,
    captureRate: battle.captureRate,
    growthRate: battle.growthRate,
    hatchCounter: battle.hatchCounter,
    isLegendary: battle.isLegendary,
    isMythical: battle.isMythical,
    isBaby: battle.isBaby,
    heldItems: battle.heldItems,
    evolutionChainId: battle.evolutionChainId,
  });
}
