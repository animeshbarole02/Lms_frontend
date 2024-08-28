
import SideBar from '../components/SideBar/SideBar'
import Navbar from '../components/Navbar/Navbar'

const AdminHOC = (Component) => function HOC() {
  return (
    <div className='adminHOC-div'>

        <Navbar/>
        <SideBar />
        

      <div className="hoc-area">

             <Component/>
      </div>  

    </div>
  )
}

export default AdminHOC