import React from 'react';

interface FoodItem {
  id: number;
  name: string;
  expirationDate: Date;
}

interface CalendarViewProps {
  foodItems: FoodItem[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ foodItems }) => {
  const daysInMonth = 31; // 簡略化のため
  const firstDayOfMonth = 3; // 0 = 日曜日, 1 = 月曜日, など

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-100"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(2024, 2, day); // 2024年3月
      const expiringItems = foodItems.filter(
        item => item.expirationDate.toDateString() === date.toDateString()
      );
      days.push(
        <div key={day} className="h-24 border border-gray-200 p-2">
          <div className="font-semibold">{day}日</div>
          {expiringItems.map((item, index) => (
            <div key={index} className="text-xs text-red-600">
              {item.name}の期限
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">賞味期限カレンダー</h2>
      <div className="grid grid-cols-7 gap-2">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarView;