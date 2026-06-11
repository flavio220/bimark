import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function RevenueChart({ data, currency }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Revenue Overview</h3>
        <p className="text-sm text-muted-foreground">Monthly revenue trends for 2024</p>
      </div>
      <div className="w-full h-80" aria-label="Monthly Revenue Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280" 
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6B7280" 
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${currency}${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                fontSize: '12px'
              }}
              formatter={(value) => [`${currency}${value?.toLocaleString()}`, 'Revenue']}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="revenue" 
              fill="#1E3A8A" 
              radius={[6, 6, 0, 0]}
              name="Revenue"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

RevenueChart.propTypes = {
  data: PropTypes?.arrayOf(
    PropTypes?.shape({
      month: PropTypes?.string?.isRequired,
      revenue: PropTypes?.number?.isRequired,
    })
  )?.isRequired,
  currency: PropTypes?.string?.isRequired,
};