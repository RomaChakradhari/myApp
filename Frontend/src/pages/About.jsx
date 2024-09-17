import Layout from "../components/Layout/Layout";
import "./pages.css";


export default function About(){
    return(
        <Layout title="About-Ecommerce">
            <div className="about-container">
                <div className="img">
                    <img src="/about.jpeg" alt="" />
                </div>
                <div className="about">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates excepturi, laudantium eaque id optio deserunt laboriosam rerum sapiente voluptatem aspernatur temporibus alias quo, cupiditate placeat, similique a aut ea iusto. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque asperiores eius autem, minima cupiditate deleniti animi illum quia enim alias voluptate, sequi labore? Beatae assumenda, laborum enim earum ex doloribus?</p>
                </div>
            </div>
        </Layout>
    )
}