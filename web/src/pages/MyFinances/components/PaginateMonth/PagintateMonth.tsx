import { Icon } from '@material-ui/core';
import { format, addMonths, subMonths } from 'date-fns';
import { useState, useEffect } from 'react';
import { useResponsive } from '../../../../hooks/useResponsive';

type Props = {
  onChange?: (dateSelected: Date) => void;
};

const PagintateMonth = (props: Props) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [currentDate, setCurrent] = useState<Date>(new Date());
  const { isMobile } = useResponsive();

  useEffect(() => {
    generateMonth(currentDate);
  }, [setDates]);

  useEffect(() => {
    if (props.onChange) {
      props.onChange(currentDate);
    }
  }, [currentDate]);

  const generateMonth = (current: Date = new Date(), maxPageDates = 5) => {
    const dates = [];

    const isPairMaxPage = maxPageDates % 2 == 0;
    let pagesBefore = Math.trunc(maxPageDates / 2);
    if (isPairMaxPage) {
      pagesBefore = pagesBefore - 1;
    }

    for (let index = pagesBefore; index >= 1; index--) {
      const beforeDate = subMonths(current, index);
      dates.push(beforeDate);
    }

    dates.push(current);

    let pagesAfter = Math.trunc(maxPageDates / 2);
    for (let index = 1; index <= pagesAfter; index++) {
      const afterDate = addMonths(current, index);
      dates.push(afterDate);
    }

    setDates(dates);
  };

  const isCurrentSelected = (date: Date) => {
    return (
      date.getUTCMonth() == currentDate.getUTCMonth() &&
      date.getUTCFullYear() == currentDate.getUTCFullYear()
    );
  };

  const handleClickMonth = (date: Date) => {
    setCurrent(date);
    generateMonth(date);
  };

  const handleReset = () => {
    const date = new Date();
    setCurrent(date);
    generateMonth(date);
  };

  const handleBefore = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrent(newDate);
    generateMonth(newDate);
  };

  const handleNext = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrent(newDate);
    generateMonth(newDate);
  };

  const isActualMonth = (date: Date) => {
    const actualDate = new Date();
    return (
      date.getUTCMonth() == actualDate.getUTCMonth() &&
      date.getUTCFullYear() == actualDate.getUTCFullYear()
    );
  };

  return (
    <div className="p-4 mb-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2">
        <div
          hidden={isMobile}
          onClick={handleBefore}
          className="rounded cursor-pointer bg-primary text-white "
        >
          <div className="flex items-center p-3">
            <Icon>navigate_before</Icon>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 w-full sm:w-fit overflow-hidden">
          {dates.map((date) => (
            <div
              key={date.getTime()}
              onClick={() => handleClickMonth(date)}
              className={`select-none flex flex-col items-center rounded px-3 py-2 justify-center cursor-pointer ${
                isCurrentSelected(date) ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              <span
                className={`uppercase block border-2 border-solid px-2 mb-1 ${
                  isActualMonth(date) ? 'border-white' : 'border-transparent'
                }`}
              >
                {format(date, 'MMM')}
              </span>
              <span className="block">{format(date, 'yyyy')}</span>
            </div>
          ))}
        </div>
        <div
          hidden={isMobile}
          onClick={handleNext}
          className="rounded cursor-pointer bg-primary text-white "
        >
          <div className="flex items-center p-3">
            <Icon>navigate_next</Icon>
          </div>
        </div>
      </div>
      {!isActualMonth(currentDate) && (
        <div
          onClick={handleReset}
          className="rounded cursor-pointer bg-primary text-white w-full mx-auto mt-4 sm:w-fit"
        >
          <div className="flex items-center justify-center p-3 gap-2">
            <Icon>restart_alt</Icon>
            {<span>Ir para o mês atual</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default PagintateMonth;
