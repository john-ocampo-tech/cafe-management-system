import { useEffect, useState } from 'react'
import './Dashboard.css'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function getDate() {
  return new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const metrics = [
  { label: "Today's Sales",  value: '₱4,820', delta: '↑ 12% vs yesterday', up: true,  icon: 'ti-cash' },
  { label: 'Total Orders',   value: '38',     delta: '↑ 5 more than avg',  up: true,  icon: 'ti-receipt' },
  { label: 'Avg. Order',     value: '₱127',   delta: '↓ 3% vs yesterday',  up: false, icon: 'ti-chart-bar' },
  { label: 'Low Stock',      value: '4',      delta: 'Items need reorder',  up: false, icon: 'ti-alert-triangle' },
]

const recentOrders = [
  { id: '#038', table: 'Table 5',  items: 2, price: '₱245', status: 'done' },
  { id: '#037', table: 'Take-out', items: 1, price: '₱95',  status: 'preparing' },
  { id: '#036', table: 'Table 2',  items: 4, price: '₱520', status: 'done' },
  { id: '#035', table: 'Table 8',  items: 3, price: '₱310', status: 'waiting' },
]

const topItems = [
  { name: 'Caramel Macchiato', count: 24, low: false },
  { name: 'Iced Americano',    count: 18, low: false },
  { name: 'Matcha Latte',      count: 7,  low: true  },
]

const weeklySales = [45, 60, 38, 75, 55, 82]
const weekDays    = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const maxSale     = Math.max(...weeklySales)

const statusConfig = {
  done:      { label: 'Done',      className: 's-done' },
  preparing: { label: 'Preparing', className: 's-prep' },
  waiting:   { label: 'Waiting',   className: 's-wait' },
}

export default function Dashboard() {
  const [greeting, setGreeting] = useState(getGreeting())

  useEffect(() => {
    const timer = setInterval(() => setGreeting(getGreeting()), 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="dashboard">
      {/* 1. Topbar */}
      <div className="dash-topbar fade-in-up">
        <div>
          <h1 className="dash-greeting">{greeting}, John</h1>
          <p className="dash-date">{getDate()}</p>
        </div>
        <div className="dash-actions">
          <button className="btn-icon">
            <i className="ti ti-bell" aria-hidden="true" />
          </button>
          <button className="btn-primary">
            <i className="ti ti-plus" aria-hidden="true" />
            New Order
          </button>
        </div>
      </div>

      {/* 2. Metrics Grid */}
      <div className="metrics-grid fade-in-up delay-1">
        {metrics.map(({ label, value, delta, up, icon }) => (
          <div key={label} className="metric-card">
            <div className="metric-label">av
              <i className={`ti ${icon}`} aria-hidden="true" />
              {label}
            </div>
            <div className="metric-value">{value}</div>
            <div className={`metric-delta ${up ? 'up' : 'down'}`}>{delta}</div>
          </div>
        ))}
      </div>

      {/* 3. Bottom Grid */}
      <div className="dash-grid fade-in-up delay-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent orders</span>
            <span className="card-sub">Today</span>
          </div>
          <table className="orders-table">
            <tbody>
              {recentOrders.map(({ id, table, items, price, status }) => {
                const { label, className } = statusConfig[status]
                return (
                  <tr key={id}>
                    <td className="order-id">{id}</td>
                    <td className="order-table">{table}</td>
                    <td className="order-items">{items} item{items > 1 ? 's' : ''}</td>
                    <td className="order-price">{price}</td>
                    <td><span className={`status-pill ${className}`}>{label}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Sales this week</span>
            <span className="card-sub">Mon–Sat</span>
          </div>
          <div className="bar-chart">
            {weeklySales.map((val, i) => (
              <div key={i} className="bar-col">
                <div
                  className={`bar ${i === weeklySales.length - 1 ? 'active' : ''}`}
                  style={{ height: `${Math.round((val / maxSale) * 100)}%` }}
                />
                <span className="bar-label">{weekDays[i]}</span>
              </div>
            ))}
          </div>
          <div className="top-items">
            {topItems.map(({ name, count, low }) => (
              <div key={name} className="top-item">
                <span className={`item-dot ${low ? 'low' : ''}`} />
                <span className="item-name">{name}</span>
                <span className="item-count">×{count}{low ? ' — low stock' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}