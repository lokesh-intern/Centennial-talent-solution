import Login from "../pages/Login.tsx"
import {Route,Routes } from 'react-router-dom'
import Register from "../pages/Register.tsx"
import JobApply from "../pages/JobApply.tsx"
import Navbar from "../components/Navbar.tsx"
import ViewCandidates from "../pages/ViewCandidates.tsx"
const Router = () => {
    return (
        <div className="flex flex-col">
            <div>
                <Navbar/>
            </div>
            <div className="mt-16">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/job-apply" element={<JobApply/>}/>
                    <Route path="/view-candidates" element={<ViewCandidates/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Router