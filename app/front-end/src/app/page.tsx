import HomePage from "./home/page";
import LoginPage from "./login/page";
import CoursePage from "./course/page";
import MyCoursePage from './mycourse/page';
import Sidebar from "./components/courseDetails/courseDetails";

export default function Defuni() {
  return (
      // <LoginPage />
      // <CoursePage/>
      // <MyCoursePage/>
      <Sidebar userType='teacher' courseId='CO2007_L01' courseName='Kiến trúc máy tính'/>
  );
}
