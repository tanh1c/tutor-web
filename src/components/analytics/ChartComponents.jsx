import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

// Chart color palette
export const CHART_COLORS = {
  primary: '#1e40af', // blue-700
  secondary: '#059669', // green-600
  tertiary: '#dc2626', // red-600
  quaternary: '#7c2d12', // amber-800
  accent: '#7c3aed', // violet-600
  gradient: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe']
};

// Session Trends Chart
export const SessionTrendsChart = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0.1}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area 
        type="monotone" 
        dataKey="sessions" 
        stroke={CHART_COLORS.primary} 
        fillOpacity={1} 
        fill="url(#sessionGradient)" 
        name="Sessions"
      />
      <Area 
        type="monotone" 
        dataKey="completed" 
        stroke={CHART_COLORS.secondary} 
        fillOpacity={0.6} 
        fill={CHART_COLORS.secondary} 
        name="Completed"
      />
    </AreaChart>
  </ResponsiveContainer>
);

// User Growth Chart
export const UserGrowthChart = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line 
        type="monotone" 
        dataKey="students" 
        stroke={CHART_COLORS.primary} 
        strokeWidth={2}
        name="Students"
      />
      <Line 
        type="monotone" 
        dataKey="tutors" 
        stroke={CHART_COLORS.secondary} 
        strokeWidth={2}
        name="Tutors"
      />
      <Line 
        type="monotone" 
        dataKey="total" 
        stroke={CHART_COLORS.accent} 
        strokeWidth={2}
        name="Total Users"
      />
    </LineChart>
  </ResponsiveContainer>
);

// Subject Distribution Chart
export const SubjectDistributionChart = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={CHART_COLORS.gradient[index % CHART_COLORS.gradient.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

// Performance Metrics Chart
export const PerformanceChart = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="rating" fill={CHART_COLORS.primary} name="Rating" />
      <Bar dataKey="completion" fill={CHART_COLORS.secondary} name="Completion %" />
      <Bar dataKey="satisfaction" fill={CHART_COLORS.accent} name="Satisfaction %" />
    </BarChart>
  </ResponsiveContainer>
);

// Earnings Chart
export const EarningsChart = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={CHART_COLORS.secondary} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={CHART_COLORS.secondary} stopOpacity={0.1}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" />
      <YAxis />
      <Tooltip formatter={(value) => [`${value.toLocaleString()} VND`, 'Earnings']} />
      <Area 
        type="monotone" 
        dataKey="earnings" 
        stroke={CHART_COLORS.secondary} 
        fillOpacity={1} 
        fill="url(#earningsGradient)" 
      />
    </AreaChart>
  </ResponsiveContainer>
);

// Satisfaction Trends Chart
export const SatisfactionChart = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis domain={[0, 5]} />
      <Tooltip />
      <Legend />
      <Line 
        type="monotone" 
        dataKey="studentSatisfaction" 
        stroke={CHART_COLORS.primary} 
        strokeWidth={2}
        name="Student Satisfaction"
      />
      <Line 
        type="monotone" 
        dataKey="tutorSatisfaction" 
        stroke={CHART_COLORS.secondary} 
        strokeWidth={2}
        name="Tutor Satisfaction"
      />
      <Line 
        type="monotone" 
        dataKey="systemSatisfaction" 
        stroke={CHART_COLORS.accent} 
        strokeWidth={2}
        name="System Satisfaction"
      />
    </LineChart>
  </ResponsiveContainer>
);

// Weekly Activity Chart
export const WeeklyActivityChart = ({ data, height = 300 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sessions" fill={CHART_COLORS.primary} name="Sessions" />
      <Bar dataKey="hours" fill={CHART_COLORS.secondary} name="Hours" />
    </BarChart>
  </ResponsiveContainer>
);
