import { Link } from 'react-router-dom';
import './index.scss';
function HomePage() {
  const pages = [
    {sl:2, title: "Blogs", slug: "/blog" },
    {sl:3,  title: "Certificates", slug: "/certificate"},
    {sl:4,  title: "Contacts", slug: "/contacts"},
    {sl:5,  title: "Faq", slug: "/faq", icon: "" },
    {sl:6,  title: "Gallerys", slug: "/gallerys"},
    {sl:7,  title: "Products", slug: "/products"},
    {sl:8,  title: "Subscribes", slug: "/subscribes"},
    {sl:9,  title: "Testmonial", slug: "/testmonial"},
    {sl:10,  title: "Pop Up", slug: "/popup"},
    {sl:11,  title: "Pages", slug: "/pages"},
    {sl:12,  title: "Settings", slug: "/settings"},
    {sl:13,  title: "Slider", slug: "/slider"},

 
  
  ]
  return (
    <div className="home">

        {pages?.map((page , number)=>(
          <Link to={page.slug} className="hp__box" key={page.sl}>
            <div className="hp__box__title"> {page.title} </div>
          </Link>
          )
        )}

    </div>
  );
}
export default HomePage;
