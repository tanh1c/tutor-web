import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';

// KPI Card Component
export const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType = 'percentage', 
  icon: Icon, 
  color = 'blue',
  loading = false 
}) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-4 h-4 bg-gray-200 rounded w-20"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <div className="mt-4 flex items-center">
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          ) : isNegative ? (
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          ) : null}
          <span className={`text-sm font-medium ml-1 ${
            isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
          }`}>
            {change > 0 ? '+' : ''}{change}
            {changeType === 'percentage' ? '%' : ''}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last period</span>
        </div>
      )}
    </div>
  );
};

// Mini Chart Component
export const MiniChart = ({ data, type = 'line', color = '#1e40af', height = 60 }) => {
  const svgWidth = 120;
  const svgHeight = height;
  
  if (type === 'line' && data.length > 1) {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * (svgWidth - 20) + 10;
      const y = svgHeight - 10 - ((value - minValue) / range) * (svgHeight - 20);
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={svgWidth} height={svgHeight} className="overflow-visible">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  }
  
  if (type === 'bar') {
    const maxValue = Math.max(...data);
    const barWidth = (svgWidth - 20) / data.length - 2;
    
    return (
      <svg width={svgWidth} height={svgHeight}>
        {data.map((value, index) => {
          const barHeight = (value / maxValue) * (svgHeight - 20);
          const x = 10 + index * (barWidth + 2);
          const y = svgHeight - 10 - barHeight;
          
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              opacity={0.7}
            />
          );
        })}
      </svg>
    );
  }
  
  return null;
};

// Trend Indicator Component
export const TrendIndicator = ({ value, label, trend, size = 'sm' }) => {
  const isPositive = trend === 'up';
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  
  return (
    <div className={`flex items-center space-x-2 ${sizeClasses[size]}`}>
      <span className="font-semibold text-gray-900">{value}</span>
      <span className="text-gray-600">{label}</span>
      {trend && (
        <div className={`flex items-center ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <TrendingUpIcon className="h-4 w-4" />
          ) : (
            <TrendingDownIcon className="h-4 w-4" />
          )}
        </div>
      )}
    </div>
  );
};

// Progress Ring Component
export const ProgressRing = ({ 
  percentage, 
  size = 80, 
  strokeWidth = 8, 
  color = '#1e40af',
  label 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${percentage * circumference / 100} ${circumference}`;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-900">
            {percentage}%
          </span>
        </div>
      </div>
      {label && (
        <span className="mt-2 text-xs text-gray-600 text-center">{label}</span>
      )}
    </div>
  );
};

// Metric Grid Component
export const MetricGrid = ({ metrics, columns = 3 }) => {
  const gridClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };
  
  return (
    <div className={`grid ${gridClasses[columns]} gap-4`}>
      {metrics.map((metric, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {metric.value}
          </div>
          <div className="text-sm text-gray-600">{metric.label}</div>
          {metric.change && (
            <div className={`text-xs mt-1 ${
              metric.change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change > 0 ? '+' : ''}{metric.change}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
