import Header from './Header.tsx'
import Dashboard from './Dashboard.tsx'
import Sidebar from './Sidebar.tsx'


function MainComponent() {
    return (
        <>
            <Header />
            <main className='grid grid-cols-[350px_1fr]'>
                <Sidebar />
                <Dashboard />            
            </main> 
        </>

    )
}

export default MainComponent