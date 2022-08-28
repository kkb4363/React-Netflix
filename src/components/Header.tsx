function Header(){
    return(
    <div className="navbar">
            <i className="fa-solid fa-bars fa-lg"></i>
            <span className="navbar_diet">Diet<i className="fa-solid fa-angle-down fa-lg"></i></span>
            <i className="fa-solid fa-circle-plus fa-lg"></i>
            <div className="navbar_userprofile"><span>계정 이름 , 이미지</span></div>
        </div>
    )
}
export default Header;