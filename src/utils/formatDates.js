let dateFormatter = (datetime) => {
  return new Date(Date.parse(datetime)).toLocaleString()
}

export { dateFormatter }