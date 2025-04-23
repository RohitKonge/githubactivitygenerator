import React, { useMemo, useCallback } from 'react';
import { startOfYear, eachDayOfInterval, format, startOfToday, isBefore, getDay, startOfWeek, subWeeks, startOfMonth, eachMonthOfInterval } from 'date-fns';

interface CalendarProps {
  selectedDates: Date[];
  onSelect: (dates: Date[]) => void;
}

interface ContributionData {
  date: Date;
  count: number;
}

export function Calendar({ selectedDates, onSelect }: CalendarProps) {
  const [contributions, setContributions] = React.useState<ContributionData[]>([]);
  
  // Calculate static dates once
  const today = useMemo(() => startOfToday(), []);
  const startDate = useMemo(() => startOfWeek(subWeeks(today, 52)), [today]);
  
  // Memoize the dates and weeks calculations
  const { dates, weeks, monthLabels } = useMemo(() => {
    const dates = eachDayOfInterval({
      start: startDate,
      end: today,
    });

    const months = eachMonthOfInterval({
      start: startDate,
      end: today,
    });

    const monthLabels = months.map(month => {
      const firstDay = startOfMonth(month);
      const weekIndex = Math.floor(dates.findIndex(date => 
        date.getTime() === firstDay.getTime()
      ) / 7);
      return {
        month: format(month, 'MMM'),
        offset: weekIndex
      };
    });

    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    dates.forEach((date) => {
      if (getDay(date) === 0 && currentWeek.length) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(date);
    });
    if (currentWeek.length) {
      weeks.push(currentWeek);
    }

    return { dates, weeks, monthLabels };
  }, [startDate, today]);

  const getContributionLevel = useCallback((count: number): number => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  }, []);

  const handleDayClick = useCallback((day: Date) => {
    if (isBefore(day, today)) {
      const existingData = contributions.find(
        c => c.date.getTime() === day.getTime()
      );
      
      let newContributions: ContributionData[];
      if (!existingData) {
        newContributions = [...contributions, { date: day, count: 1 }];
      } else {
        newContributions = contributions.map(c =>
          c.date.getTime() === day.getTime()
            ? { ...c, count: c.count + 1 }
            : c
        );
      }
      
      setContributions(newContributions);
      const datesWithContributions = newContributions.reduce((acc: Date[], curr) => {
        const dates: Date[] = [];
        for (let i = 0; i < curr.count; i++) {
          dates.push(curr.date);
        }
        return [...acc, ...dates];
      }, []);
      onSelect(datesWithContributions);
    }
  }, [contributions, today, onSelect]);

  const getContributionColor = useCallback((date: Date) => {
    if (!isBefore(date, today)) return 'bg-[#ebedf0]';
    
    const contribution = contributions.find(
      c => c.date.getTime() === date.getTime()
    );
    
    if (!contribution) return 'bg-[#ebedf0] hover:bg-[#9be9a8]';
    
    const level = getContributionLevel(contribution.count);
    const colors = {
      1: 'bg-[#9be9a8] hover:bg-[#40c463]',
      2: 'bg-[#40c463] hover:bg-[#30a14e]',
      3: 'bg-[#30a14e] hover:bg-[#216e39]',
      4: 'bg-[#216e39] hover:bg-[#216e39]'
    };
    
    return colors[level as keyof typeof colors];
  }, [contributions, today, getContributionLevel]);

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-[930px]">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contribution Activity</h2>
      <div className="overflow-x-auto">
        {/* Month labels */}
        <div className="flex mb-7 text-xs text-gray-500 min-w-[800px]">
          <div className="w-[55px]" />
          <div className="relative flex-1">
            {monthLabels.map(({ month, offset }, index) => (
              <div 
                key={`${month}-${index}`}
                className="absolute text-xs text-gray-500"
                style={{ 
                  left: `${offset * 14.5}px`, // Adjusted spacing
                  top: '0',
                  minWidth: '30px' // Ensure minimum width for month label
                }}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex min-w-[800px]">
          {/* Weekday labels */}
          <div className="pr-4 flex flex-col justify-between text-xs text-gray-500 h-[95px]">
            <div>Mon</div>
            <div>Wed</div>
            <div>Fri</div>
          </div>

          {/* Contribution squares */}
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => {
                  const contributionCount = contributions.find(
                    c => c.date.getTime() === day.getTime()
                  )?.count || 0;
                  return (
                    <div
                      key={dayIndex}
                      onClick={() => handleDayClick(day)}
                      className={`w-[11px] h-[11px] rounded-[2px] cursor-pointer ${getContributionColor(day)}`}
                      title={`${format(day, 'MMMM d, yyyy')}: ${contributionCount} contribution${contributionCount !== 1 ? 's' : ''}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">
          {selectedDates.length} total contributions across {contributions.length} days
        </span>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-600">Less</div>
          <div className="flex gap-[2px]">
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#ebedf0]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#9be9a8]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#40c463]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#30a14e]" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#216e39]" />
          </div>
          <div className="text-xs text-gray-600">More</div>
          <button
            onClick={() => {
              setContributions([]);
              onSelect([]);
            }}
            className="ml-4 text-sm text-gray-600 hover:text-gray-700 font-medium"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}