import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const MOCK = {
  totalCompleted: 24,
  totalInProgress: 8,
  completionRate: 73,
  currentStreak: 6,
  longestStreak: 14,

  tasksByDay: [
    { label: "26/03", count: 1 },
    { label: "27/03", count: 3 },
    { label: "28/03", count: 2 },
    { label: "29/03", count: 5 },
    { label: "30/03", count: 1 },
    { label: "31/03", count: 4 },
    { label: "01/04", count: 6 },
    { label: "02/04", count: 3 },
    { label: "03/04", count: 7 },
    { label: "04/04", count: 4 },
  ],

  tasksByHour: [
    { label: "6h", count: 0 },
    { label: "8h", count: 1 },
    { label: "10h", count: 4 },
    { label: "12h", count: 3 },
    { label: "14h", count: 5 },
    { label: "16h", count: 6 },
    { label: "18h", count: 4 },
    { label: "20h", count: 2 },
    { label: "22h", count: 1 },
  ],

  tasksByPriority: [
    { priority: "LOW", label: "Baixa", count: 12, color: "#4ade80" },
    { priority: "MEDIUM", label: "Média", count: 16, color: "#facc15" },
    { priority: "HIGH", label: "Alta", count: 6, color: "#f87171" },
  ],

  tasksByList: [
    { listId: "1", listName: "sad", total: 10, completed: 7 },
    { listId: "2", listName: "test", total: 5, completed: 2 },
  ],

  streakDays: Array.from({ length: 30 }, (_, i) => {
    const counts = [0,0,2,3,4,5,5,0,1,3,5,5,5,5,2,0,0,3,5,5,5,5,5,4,0,0,0,0,0,0];
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toISOString().slice(0, 10),
      count: counts[i],
    };
  }),
};

const chartConfig = {
  count: { label: "Tarefas", color: "#a78bfa" },
};

const LIST_COLORS = ["#a78bfa", "#38bdf8", "#34d399", "#fb923c", "#f472b6"];

function MetricCard({
  label,
  value,
  sub,
  subColor,
}: {
  label: string;
  value: string | number;
  sub?: string;
  subColor?: string;
}) {
  return (
    <div className="bg-[#242424] rounded-xl p-4 border border-[#2e2e2e]">
      <p className="text-[11px] text-zinc-500 mb-1">{label}</p>
      <p className="text-2xl font-medium text-zinc-100">{value}</p>
      {sub && (
        <p className="text-[11px] mt-1" style={{ color: subColor ?? "#555" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function PriorityBars() {
  const total = MOCK.tasksByPriority.reduce((acc, d) => acc + d.count, 0);
  return (
    <div className="flex flex-col gap-3">
      {MOCK.tasksByPriority.map((item) => (
        <div key={item.priority} className="flex items-center gap-2 text-[12px]">
          <span className="min-w-[48px]" style={{ color: item.color }}>
            {item.label}
          </span>
          <div className="flex-1 bg-[#333] rounded-sm h-[5px]">
            <div
              className="h-[5px] rounded-sm"
              style={{
                width: `${(item.count / total) * 100}%`,
                background: item.color,
              }}
            />
          </div>
          <span className="text-zinc-600 min-w-[20px] text-right">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

function ListBars() {
  return (
    <div className="flex flex-col gap-3">
      {MOCK.tasksByList.map((list, i) => {
        const pct = list.total > 0 ? Math.round((list.completed / list.total) * 100) : 0;
        const color = LIST_COLORS[i % LIST_COLORS.length];
        return (
          <div key={list.listId} className="flex items-center gap-2 text-[12px]">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
            <span className="text-zinc-400 flex-1 truncate">{list.listName}</span>
            <div className="w-24 bg-[#333] rounded-sm h-[4px]">
              <div
                className="h-[4px] rounded-sm"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
            <span className="text-zinc-600 min-w-[32px] text-right">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}

function StreakGrid() {
  const today = new Date().toISOString().slice(0, 10);

  const getColor = (count: number) => {
    if (count === 0) return "#2e2e2e";
    if (count <= 2) return "#4ade8033";
    if (count <= 4) return "#4ade8077";
    return "#4ade80";
  };

  return (
    <div className="bg-[#242424] rounded-xl p-4 border border-[#2e2e2e]">
      <p className="text-[13px] font-medium text-zinc-400 mb-3">
        Streak de produtividade
      </p>
      <div className="flex flex-wrap gap-1">
        {MOCK.streakDays.map((day) => (
          <div
            key={day.date}
            title={`${day.date}: ${day.count} tarefas`}
            className="w-5 h-5 rounded-sm"
            style={{
              background: getColor(day.count),
              opacity: day.date > today ? 0.3 : 1,
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 mt-3 text-[11px] text-zinc-600">
        {[
          { color: "#2e2e2e", label: "nenhuma" },
          { color: "#4ade8033", label: "1–2" },
          { color: "#4ade8077", label: "3–4" },
          { color: "#4ade80", label: "5+" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DashboardPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-lg font-medium text-zinc-100">Dashboard</h1>
        <p className="text-[13px] text-zinc-500">Resumo dos últimos 30 dias</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-3">
        <MetricCard
          label="Tarefas concluídas"
          value={MOCK.totalCompleted}
          sub="+12% esta semana"
          subColor="#4ade80"
        />
        <MetricCard
          label="Em andamento"
          value={MOCK.totalInProgress}
          sub="tarefas abertas"
        />
        <MetricCard
          label="Taxa de conclusão"
          value={`${MOCK.completionRate}%`}
          sub="do total de tarefas"
          subColor="#4ade80"
        />
        <MetricCard
          label="Streak atual"
          value={`${MOCK.currentStreak} dias`}
          sub={`Recorde: ${MOCK.longestStreak} dias`}
          subColor="#f59e0b"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-[#242424] rounded-xl p-4 border border-[#2e2e2e]">
          <p className="text-[13px] font-medium text-zinc-400 mb-3">
            Tarefas concluídas por dia
          </p>
          <ChartContainer config={chartConfig} className="h-[180px] w-full">
            <BarChart data={MOCK.tasksByDay} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#2a2a2a" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#555", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#555", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="bg-[#242424] rounded-xl p-4 border border-[#2e2e2e]">
          <p className="text-[13px] font-medium text-zinc-400 mb-3">Por prioridade</p>
          <PriorityBars />
          <p className="text-[13px] font-medium text-zinc-400 mt-5 mb-3">Por lista</p>
          <ListBars />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-4">
        <StreakGrid />

        <div className="bg-[#242424] rounded-xl p-4 border border-[#2e2e2e]">
          <p className="text-[13px] font-medium text-zinc-400 mb-3">
            Conclusões por hora do dia
          </p>
          <ChartContainer config={chartConfig} className="h-[140px] w-full">
            <LineChart
              data={MOCK.tasksByHour}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#2a2a2a" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#555", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#555", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={{ fill: "#38bdf8", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}