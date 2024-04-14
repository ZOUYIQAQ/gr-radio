import './homepage.css'
// 星星列表
function StarList() {
    const star_img = 'img/icons8-nostar-50.png'
    let stars = []
    for (let i = 0; i < 5; i++) {
        stars.push(<img className="star" src={star_img} alt="" key={i}></img>)
    }
    return stars
}
function Homepage() {
    return (
        <>
        
        </>
    )
}
export default Homepage