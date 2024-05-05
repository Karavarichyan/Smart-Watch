import TimeSlide from './components/TimeSlide.vue';

describe('TimeSlide', () => {
  it('displays the current time correctly', () => {
    const timeSlide = new TimeSlide();
    const currentTime = new Date();
    const expectedHours = String(currentTime.getHours()).padStart(2, '0');
    const expectedMinutes = String(currentTime.getMinutes()).padStart(2, '0');

    // Проверяем, что текст времени отображается корректно
    expect(timeSlide.hours).toBe(expectedHours);
    expect(timeSlide.minutes).toBe(expectedMinutes);

    // Проверяем, что текст дня недели и дня месяца отображается корректно
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wedn', 'Thurs', 'Fri', 'Satur'];
    const expectedDayOfWeek = daysOfWeek[currentTime.getDay()];
    const expectedMonthDay = String(currentTime.getDate());
    expect(timeSlide.dayOfWeek).toBe(expectedDayOfWeek);
    expect(timeSlide.monthDay).toBe(expectedMonthDay);
  });

  it('renders the "Download" button', () => {
    const timeSlide = new TimeSlide();

    // Проверяем, что кнопка "Download" отображается
    expect(timeSlide.showDownloadButton).toBe(true);
  });

  // Добавьте другие тесты по мере необходимости
});
