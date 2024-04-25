export const durationUnits = ['gün', 'hafta', 'ay', 'yıl']

export const currencies = ['TRY']

export const packageTypes = ['Muayene', 'Kontrol']

export const calculateEndDate = (startDate, incrementType, incrementValue) => {
  const date = new Date(startDate)

  if (incrementType === 'day') {
    date.setDate(date.getDate() + incrementValue)
  } else if (incrementType === 'week') {
    date.setDate(date.getDate() + 7 * incrementValue)
  } else if (incrementType === 'month') {
    date.setMonth(date.getMonth() + incrementValue)
  }

  return date
}
