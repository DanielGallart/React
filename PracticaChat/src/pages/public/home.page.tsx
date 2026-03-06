const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="bg-surface rounded-xl shadow-lg p-8 flex flex-col items-center gap-4">
        <span className="text-primary text-4xl">💬</span>
        <h1 className="text-3xl font-bold text-text">Welcome to PracticaChat</h1>
        <p className="text-text text-lg">A simple, modern messaging app built with React & TypeScript</p>
      </div>
    </div>
  )
}
export default HomePage