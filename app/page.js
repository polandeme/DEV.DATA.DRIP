'use client';

import { useState, useEffect, useCallback } from 'react';

const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const THEMES = [
  { id: 'tech', name: '科技风', icon: '🚀' },
  { id: 'business', name: '商务风', icon: '💼' },
  { id: 'minimal', name: '极简风', icon: '○' },
  { id: 'cute', name: '女生风', icon: '✨' },
];

const YEAR = 2026;

// 获取某月的天数
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// 获取某月第一天是星期几
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// 判断是否是今天
function isToday(year, month, day) {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
}

// 判断是否是周末
function isWeekend(year, month, day) {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

export default function CalendarPage() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('tech');
  const [view, setView] = useState('year'); // 'year' or 'month'
  const [currentMonth, setCurrentMonth] = useState(0);
  const [events, setEvents] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventForm, setEventForm] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);

  // 确保客户端已挂载
  useEffect(() => {
    setMounted(true);
  }, []);

  // 从 API 加载事件
  const loadEvents = useCallback(async () => {
    try {
      const res = await fetch('/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // 设置主题
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 保存事件
  const saveEvent = async () => {
    if (!eventForm.title.trim() || !selectedDate) return;

    const dateKey = `${YEAR}-${String(selectedDate.month + 1).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
    const newEvent = {
      id: Date.now().toString(),
      title: eventForm.title,
      description: eventForm.description,
    };

    const updatedEvents = {
      ...events,
      [dateKey]: [...(events[dateKey] || []), newEvent],
    };

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: dateKey, event: newEvent }),
      });

      if (res.ok) {
        setEvents(updatedEvents);
        setEventForm({ title: '', description: '' });
        setModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  // 删除事件
  const deleteEvent = async (dateKey, eventId) => {
    try {
      const res = await fetch('/api/events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: dateKey, eventId }),
      });

      if (res.ok) {
        const updatedEvents = { ...events };
        updatedEvents[dateKey] = updatedEvents[dateKey].filter(e => e.id !== eventId);
        if (updatedEvents[dateKey].length === 0) {
          delete updatedEvents[dateKey];
        }
        setEvents(updatedEvents);
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  // 打开日期详情
  const openDateModal = (month, day) => {
    setSelectedDate({ month, day });
    setModalOpen(true);
  };

  // 获取日期的事件
  const getDateEvents = (month, day) => {
    const dateKey = `${YEAR}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events[dateKey] || [];
  };

  // 检查日期是否有事件
  const hasEvents = (month, day) => {
    return getDateEvents(month, day).length > 0;
  };

  // 打印
  const handlePrint = () => {
    window.print();
  };

  // 渲染月份卡片（年视图中使用）
  const renderMonthCard = (monthIndex) => {
    const daysInMonth = getDaysInMonth(YEAR, monthIndex);
    const firstDay = getFirstDayOfMonth(YEAR, monthIndex);
    const days = [];

    // 填充月初空白
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
    }

    // 填充日期
    for (let day = 1; day <= daysInMonth; day++) {
      const todayClass = mounted && isToday(YEAR, monthIndex, day) ? 'today' : '';
      const weekendClass = isWeekend(YEAR, monthIndex, day) ? 'weekend' : '';
      const eventClass = hasEvents(monthIndex, day) ? 'has-event' : '';

      days.push(
        <div
          key={day}
          className={`day-cell ${todayClass} ${weekendClass} ${eventClass}`}
          onClick={(e) => {
            e.stopPropagation();
            openDateModal(monthIndex, day);
          }}
        >
          {day}
        </div>
      );
    }

    return (
      <div
        key={monthIndex}
        className="month-card"
        onClick={() => {
          setCurrentMonth(monthIndex);
          setView('month');
        }}
      >
        <div className="month-header">{MONTHS[monthIndex]}</div>
        <div className="month-body">
          <div className="weekdays">
            {WEEKDAYS.map((day) => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          <div className="days-grid">{days}</div>
        </div>
      </div>
    );
  };

  // 渲染月视图
  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(YEAR, currentMonth);
    const firstDay = getFirstDayOfMonth(YEAR, currentMonth);
    const days = [];

    // 填充月初空白
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="month-view-day empty"></div>);
    }

    // 填充日期
    for (let day = 1; day <= daysInMonth; day++) {
      const todayClass = mounted && isToday(YEAR, currentMonth, day) ? 'today' : '';
      const weekendClass = isWeekend(YEAR, currentMonth, day) ? 'weekend' : '';
      const dateEvents = getDateEvents(currentMonth, day);

      days.push(
        <div
          key={day}
          className={`month-view-day ${todayClass} ${weekendClass}`}
          onClick={() => openDateModal(currentMonth, day)}
        >
          <div className="day-number">{day}</div>
          {dateEvents.length > 0 && (
            <div className="event-list">
              {dateEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="event-item" title={event.title}>
                  {event.title}
                </div>
              ))}
              {dateEvents.length > 3 && (
                <div className="event-item">+{dateEvents.length - 3} 更多</div>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="month-view">
        <div className="month-view-header">
          <div className="month-nav">
            <button
              className="btn btn-icon"
              onClick={() => setCurrentMonth((prev) => Math.max(0, prev - 1))}
              disabled={currentMonth === 0}
            >
              ←
            </button>
            <div className="month-nav-title">{YEAR}年 {MONTHS[currentMonth]}</div>
            <button
              className="btn btn-icon"
              onClick={() => setCurrentMonth((prev) => Math.min(11, prev + 1))}
              disabled={currentMonth === 11}
            >
              →
            </button>
          </div>
        </div>
        <div className="month-view-weekdays">
          {WEEKDAYS.map((day) => (
            <div key={day} className="month-view-weekday">{day}</div>
          ))}
        </div>
        <div className="month-view-days">{days}</div>
      </div>
    );
  };

  // 获取当前选中日期的key
  const getSelectedDateKey = () => {
    if (!selectedDate) return '';
    return `${YEAR}-${String(selectedDate.month + 1).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="loading">加载中...</div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="header">
        <h1 className="header-title">
          <span className="year">{YEAR}</span>
          <span>年度日历</span>
        </h1>

        <div className="header-controls">
          {/* Theme Switcher */}
          <div className="theme-switcher">
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`theme-btn ${theme === t.id ? 'active' : ''}`}
                data-theme={t.id}
                onClick={() => setTheme(t.id)}
                title={t.name}
              >
                {t.icon}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${view === 'year' ? 'active' : ''}`}
              onClick={() => setView('year')}
            >
              年视图
            </button>
            <button
              className={`view-btn ${view === 'month' ? 'active' : ''}`}
              onClick={() => setView('month')}
            >
              月视图
            </button>
          </div>

          {/* Print Button */}
          <button className="btn" onClick={handlePrint}>
            🖨️ 打印
          </button>
        </div>
      </header>

      {/* Calendar Content */}
      <main className="calendar-container">
        {view === 'year' ? (
          <div className="year-grid">
            {Array.from({ length: 12 }, (_, i) => renderMonthCard(i))}
          </div>
        ) : (
          renderMonthView()
        )}
      </main>

      {/* Event Modal */}
      <div
        className={`modal-overlay ${modalOpen ? 'active' : ''}`}
        onClick={() => setModalOpen(false)}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">
              {selectedDate && `${YEAR}年${selectedDate.month + 1}月${selectedDate.day}日`}
            </h2>
            <button className="modal-close" onClick={() => setModalOpen(false)}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">事件标题</label>
              <input
                type="text"
                className="form-input"
                placeholder="输入事件标题..."
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">事件描述（可选）</label>
              <textarea
                className="form-input form-textarea"
                placeholder="输入事件描述..."
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
              />
            </div>

            {/* Existing Events */}
            {selectedDate && getDateEvents(selectedDate.month, selectedDate.day).length > 0 && (
              <div className="events-list-modal">
                <div className="events-list-title">已有事件</div>
                {getDateEvents(selectedDate.month, selectedDate.day).map((event) => (
                  <div key={event.id} className="event-item-modal">
                    <div className="event-item-content">
                      <h4>{event.title}</h4>
                      {event.description && <p>{event.description}</p>}
                    </div>
                    <button
                      className="event-delete"
                      onClick={() => deleteEvent(getSelectedDateKey(), event.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn" onClick={() => setModalOpen(false)}>
              取消
            </button>
            <button className="btn btn-primary" onClick={saveEvent}>
              保存事件
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
