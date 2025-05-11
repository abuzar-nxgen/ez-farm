"use client";

import React from "react";
import { useLanguage } from "@/components/language-provider";
import {
  MilkIcon as CowIcon,
  WheatIcon as SheepIcon,
  Rabbit as GoatIcon,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface LivestockCardProps {
  animalType: string; // e.g., "Cattle", "Goat", "Sheep"
  count: number;
  healthStatus: {
    healthy: number;
    sick: number;
    treatment: number;
  };
  recentAdditions: number;
}

const typeIconMap: Record<string, JSX.Element> = {
  cattle: <CowIcon className="w-6 h-6 text-primary" />,
  goat: <GoatIcon className="w-6 h-6 text-primary" />,
  sheep: <SheepIcon className="w-6 h-6 text-primary" />,
};

export function LivestockCard({
  animalType,
  count,
  healthStatus,
  recentAdditions,
}: LivestockCardProps): JSX.Element {
  const { t } = useLanguage();

  const icon = typeIconMap[animalType.toLowerCase()] ?? <CowIcon className="w-6 h-6 text-muted" />;

  return (
    <div className="p-4 bg-white rounded shadow flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold capitalize">{animalType}</h3>
        {icon}
      </div>
      <p>{t("total")}: {count}</p>
      <p>
        {t("health")}: 🟢 {healthStatus.healthy}, 🔴 {healthStatus.sick}, 💊 {healthStatus.treatment}
      </p>
      <p>{t("newAdditions")}: {recentAdditions}</p>
    </div>
  );
}
