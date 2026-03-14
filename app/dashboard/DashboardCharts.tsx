"use client";

import { useEffect } from "react";

export default function DashboardCharts({
  labels14,
  labels30,
  dm14,
  email14,
  dm30,
  email30,
  target14,
  target30,
  funnel,
}: {
  labels14: string[];
  labels30: string[];
  dm14: number[];
  email14: number[];
  dm30: number[];
  email30: number[];
  target14: number[];
  target30: number[];
  funnel: number[];
}) {
  useEffect(() => {
    let chart: any;
    let funnelChart: any;
    let btn: HTMLElement | null = null;
    let handler: (() => void) | null = null;

    const init = async () => {
      const mod = await import("chart.js/auto");
      const Chart = mod.default || (mod as any);
      const ctx = (document.getElementById("dailyChart") as HTMLCanvasElement)?.getContext("2d");
      const fctx = (document.getElementById("funnelChart") as HTMLCanvasElement)?.getContext("2d");
      if (!ctx || !fctx) return;

      const state = {
        showing30: false,
      };

      const existing = Chart.getChart("dailyChart");
      if (existing) existing.destroy();
      const existingF = Chart.getChart("funnelChart");
      if (existingF) existingF.destroy();

      chart = new Chart(ctx, {
      data: {
        labels: labels14,
        datasets: [
          { type: "bar", label: "DMs", data: dm14, backgroundColor: "rgba(0,61,89,0.9)" },
          { type: "bar", label: "Emails", data: email14, backgroundColor: "rgba(233,228,219,0.9)" },
          { type: "line", label: "Target line", data: target14, borderColor: "rgba(255, 99, 99, 0.6)", backgroundColor: "rgba(255,99,99,0.4)", borderWidth: 2, tension: 0.2, fill: false, pointRadius: 0 },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: "#9aa6b6" } } },
        scales: {
          x: { ticks: { color: "#7a8394" }, grid: { color: "rgba(255,255,255,0.05)" } },
          y: { ticks: { color: "#7a8394" }, grid: { color: "rgba(255,255,255,0.05)" }, beginAtZero: true },
        },
      },
    });

      funnelChart = new Chart(fctx, {
      type: "bar",
      data: {
        labels: ["DMs", "Replies", "Calls", "Closes"],
        datasets: [
          {
            label: "Funnel",
            data: funnel,
            backgroundColor: ["rgba(0,61,89,0.9)", "rgba(0,61,89,0.7)", "rgba(0,61,89,0.55)", "rgba(0,61,89,0.4)"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#7a8394" }, grid: { color: "rgba(255,255,255,0.05)" } },
          y: { ticks: { color: "#7a8394" }, grid: { color: "rgba(255,255,255,0.05)" }, beginAtZero: true },
        },
      },
    });

      btn = document.getElementById("toggleRange");
      const label = document.getElementById("rangeLabel");
      const inner = document.getElementById("chartInner");
      handler = () => {
        state.showing30 = !state.showing30;
        if (label) label.textContent = state.showing30 ? "Next 30 days" : "Past 7 + Next 7";
        if (inner) (inner as HTMLDivElement).style.minWidth = state.showing30 ? "2000px" : "900px";
        chart.data.labels = state.showing30 ? labels30 : labels14;
        chart.data.datasets[0].data = state.showing30 ? dm30 : dm14;
        chart.data.datasets[1].data = state.showing30 ? email30 : email14;
        chart.data.datasets[2].data = state.showing30 ? target30 : target14;
        chart.update();
      };
      btn?.addEventListener("click", handler);
    };

    init();

    return () => {
      if (btn && handler) btn.removeEventListener("click", handler);
      if (chart) chart.destroy();
      if (funnelChart) funnelChart.destroy();
    };
  }, [labels14, labels30, dm14, email14, dm30, email30, target14, target30, funnel]);

  return null;
}
