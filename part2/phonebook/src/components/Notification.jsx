const Notification = ({ notification }) => {
  if (notification === null) return

  const style = {
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return <div style={style}>{notification.message}</div>
}

export default Notification