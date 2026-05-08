"use client";

import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { MOCK_DASHBOARD_STATS, MOCK_REVENUE_SERIES } from "@/mock/dashboard";
import { MOCK_PRODUCTS } from "@/mock/products";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCompact, formatCurrency } from "@/lib/format";
import type { TimeSeriesPoint } from "@/types";

const chartConfig = {
  revenue: { label: "Revenus", color: "var(--chart-1)" },
  orders: { label: "Commandes", color: "var(--chart-3)" },
} satisfies ChartConfig;

function clampIsoRange(from: string, to: string, minBound: string, maxBound: string) {
  let a = from <= to ? from : to;
  let b = from <= to ? to : from;
  if (a < minBound) a = minBound;
  if (b > maxBound) b = maxBound;
  if (a > b) return { from: minBound, to: maxBound };
  return { from: a, to: b };
}

function addDaysIso(iso: string, delta: number): string {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + delta);
  return d.toISOString().slice(0, 10);
}

function filterSeries(series: TimeSeriesPoint[], from: string, to: string) {
  return series.filter((p) => p.date >= from && p.date <= to).sort((a, b) => a.date.localeCompare(b.date));
}

/** Compare la première moitié de la série à la seconde (tendance démo). */
function halfSeriesTrendPct(points: TimeSeriesPoint[], key: "revenue" | "orders"): number | null {
  if (points.length < 4) return null;
  const mid = Math.floor(points.length / 2);
  const first = points.slice(0, mid);
  const second = points.slice(mid);
  const sum = (arr: TimeSeriesPoint[]) => arr.reduce((s, p) => s + p[key], 0);
  const s1 = sum(first);
  const s2 = sum(second);
  if (s1 === 0) return null;
  return ((s2 - s1) / s1) * 100;
}

export default function AdminDashboardPage() {
  const stats = MOCK_DASHBOARD_STATS;
  const top = [...MOCK_PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const bounds = useMemo(() => {
    const sorted = [...MOCK_REVENUE_SERIES].map((p) => p.date).sort();
    return { min: sorted[0]!, max: sorted[sorted.length - 1]! };
  }, []);

  const [from, setFrom] = useState(bounds.min);
  const [to, setTo] = useState(bounds.max);

  const { from: rf, to: rt } = clampIsoRange(from, to, bounds.min, bounds.max);
  const filteredSeries = useMemo(() => filterSeries(MOCK_REVENUE_SERIES, rf, rt), [rf, rt]);
  const periodRevenue = filteredSeries.reduce((s, p) => s + p.revenue, 0);
  const periodOrders = filteredSeries.reduce((s, p) => s + p.orders, 0);
  const revTrend = halfSeriesTrendPct(filteredSeries, "revenue");
  const ordTrend = halfSeriesTrendPct(filteredSeries, "orders");

  function applyPreset(kind: "full" | "30d" | "7d") {
    if (kind === "full") {
      setFrom(bounds.min);
      setTo(bounds.max);
      return;
    }
    const span = kind === "7d" ? 6 : 29;
    const end = bounds.max;
    const start = addDaysIso(end, -span);
    const clamped = clampIsoRange(start, end, bounds.min, bounds.max);
    setFrom(clamped.from);
    setTo(clamped.to);
  }

  const presetFull = rf === bounds.min && rt === bounds.max;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Synthèse ventes, stocks et satisfaction en un coup d&apos;œil.</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Revenus et commandes ci-dessous suivent la période sélectionnée (données démo).
          </p>
        </div>

        <Card className="rounded-[1.5rem] border border-border p-4 shadow-sm lg:min-w-[min(100%,380px)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Période</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant={presetFull ? "default" : "outline"}
              size="sm"
              className="rounded-xl"
              onClick={() => applyPreset("full")}
            >
              Toute la série
            </Button>
            <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={() => applyPreset("30d")}>
              30 jours
            </Button>
            <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={() => applyPreset("7d")}>
              7 jours
            </Button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="dash-from">Du</Label>
              <Input
                id="dash-from"
                type="date"
                min={bounds.min}
                max={bounds.max}
                value={from}
                className="rounded-xl"
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dash-to">Au</Label>
              <Input
                id="dash-to"
                type="date"
                min={bounds.min}
                max={bounds.max}
                value={to}
                className="rounded-xl"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-[1.5rem] border border-border p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Revenus (FCFA)</p>
          <p className="mt-2 text-2xl font-bold">{formatCurrency(periodRevenue)}</p>
          {revTrend != null ? (
            <p className={revTrend >= 0 ? "text-sm text-primary" : "text-sm text-destructive"}>
              {revTrend >= 0 ? "+" : ""}
              {revTrend.toFixed(1)} % 1re moitié → 2e moitié
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Pas assez de points pour une tendance</p>
          )}
        </Card>
        <Card className="rounded-[1.5rem] border border-border p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Commandes</p>
          <p className="mt-2 text-2xl font-bold">{formatCompact(periodOrders)}</p>
          {ordTrend != null ? (
            <p className={ordTrend >= 0 ? "text-sm text-primary" : "text-sm text-destructive"}>
              {ordTrend >= 0 ? "+" : ""}
              {ordTrend.toFixed(1)} % 1re moitié → 2e moitié
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Pas assez de points pour une tendance</p>
          )}
        </Card>
        <Card className="rounded-[1.5rem] border border-border p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Clients actifs</p>
          <p className="mt-2 text-2xl font-bold">{formatCompact(stats.customers)}</p>
        </Card>
        <Card className="rounded-[1.5rem] border border-border p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">SKU publiées</p>
          <p className="mt-2 text-2xl font-bold">{stats.products}</p>
        </Card>
      </div>

      <Card className="rounded-[2rem] border border-border p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-lg font-semibold">Courbe revenue / commandes</h2>
          <p className="text-xs text-muted-foreground tabular-nums">
            {rf} → {rt} · {filteredSeries.length} jour(s) avec données
          </p>
        </div>
        {filteredSeries.length === 0 ? (
          <div className="mt-8 flex h-[340px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
            Aucune donnée sur cette plage — élargissez les dates.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="mt-8 h-[340px] w-full">
            <AreaChart accessibilityLayer data={filteredSeries}>
              <defs>
                <linearGradient id="fillRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.85} />
                  <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="4 4" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area dataKey="revenue" type="monotone" fill="url(#fillRev)" stroke="var(--color-revenue)" />
            </AreaChart>
          </ChartContainer>
        )}
      </Card>

      <Card className="rounded-[2rem] border border-border p-6">
        <h2 className="text-lg font-semibold">Produits les plus notés</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {top.map((p) => (
            <li key={p.id} className="flex justify-between rounded-xl border border-border/60 bg-card px-4 py-3">
              <span>{p.name}</span>
              <span className="font-semibold text-primary">{p.rating.toFixed(1)}★</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
