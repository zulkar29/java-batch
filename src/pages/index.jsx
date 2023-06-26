import { Route, Routes } from "react-router-dom";
import HomePage from "./home";
import Login from "./login";
import BlogPage from "./blogs";
import CreateBlog from './blogs/create'
import EditBlog from "./blogs/edit";
import CertificatePage from './certificate';
import CreateCertificate from './certificate/create';
import ContactPage from './contacts';
import ViewContact from './contacts/view';
import FaqPage from './faq';
import CreateFaq from './faq/create'; 
import EditFaq from './faq/edit';
import GalleryPage from './gallerys';
import CreateGallery from './gallerys/create';
import EditGallery from "./gallerys/edit";
import ProductsPage from './products';
import SubscribesPage from './subscribes';
import CreateProduct from './products/create';
import EditProduct from './products/edit';
import DownloadPage from './static-pages/download-page';
import EditDownload from './static-pages/download-page/edit';
import HomepPage from './static-pages/homep';
import EditpHome from './static-pages/homep/edit';
import UserProfile from "./user";
import PageSection from './page-section';
import CreatePageSection from "./page-section/create";
import EditPageSection from "./page-section/edit";
import CommonPagwView from "./page-section/view";
import Testmonial from "./testmonial";
import TestmonialEdit from "./testmonial/edit";
import Popup from "./popup";
import PopupEdit from "./popup/edit";
import PopupCreate from "./popup/create";
import SliderPage from "./slider";
import CreateSlider from "./slider/create";
import EditSlider from "./slider/edit";

function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/create" element={<CreateBlog />} />
      <Route path="/blog/edit/:blogid" element={<EditBlog />} />
      
      <Route path="/certificate" element={<CertificatePage />} />
      <Route path="/certificate/create" element={<CreateCertificate />} /> 
      <Route path="/contacts" element={<ContactPage />} />
      <Route path="/contact/view/:contactid" element={<ViewContact />} />

      <Route path="/faq" element={<FaqPage />} />
      <Route path="/faq/create" element={<CreateFaq />} />
      <Route path="/faq/edit/:faqid" element={<EditFaq />} />
      
      <Route path="/gallerys" element={<GalleryPage />} />
      <Route path="/gallerys/create" element={<CreateGallery />} />  
      <Route path="/gallerys/edit/:galleryid" element={<EditGallery />} /> 

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/create" element={<CreateProduct />} />
      <Route path="/products/edit/:productid" element={<EditProduct />} />
     
      <Route path="/subscribes" element={<SubscribesPage />} />

      <Route path="/pages" element={<PageSection/>} />
      <Route path="/pages/create" element={<CreatePageSection/>} />
      <Route path="/pages/:page" element={<CommonPagwView/>} />
      <Route path="/pages/:slug/edit" element={<EditPageSection />} />
      
      <Route path="pages/home" element={<HomepPage />} />
      <Route path="pages/home/edit" element={<EditpHome />} />

      <Route path="pages/download" element={<DownloadPage />} />
      <Route path="pages/download/edit" element={<EditDownload />} />

      <Route path="/users" element={<UserProfile/>} />      
     
      <Route path="/testmonial" element={<Testmonial/>} />
      <Route path="/testmonial/edit/:testmonialid" element={<TestmonialEdit/>} />
      
      <Route path="/popup" element={<Popup/>} />
      <Route path="/popup/create" element={<PopupCreate/>} />
      <Route path="/popup/edit/:popupid" element={<PopupEdit/>} />

      <Route path="/slider" element={<SliderPage/>} />
      <Route path="/slider/create" element={<CreateSlider/>} />
      <Route path ="/slider/edit/:sliderid" element={<EditSlider/>} />
      
    </Routes>
  );
}

export default PageRoutes;
