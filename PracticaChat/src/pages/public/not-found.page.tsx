const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-surface rounded-xl shadow-lg p-8 flex flex-col items-center gap-4">
        <span className="text-danger text-4xl">🚫</span>
        <h1 className="text-3xl font-bold text-text">404 - Not Found</h1>
        <p className="text-text text-lg">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  )
}
export default NotFoundPage