import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CanvasBackground } from './components/common/CanvasBackground';
import { Navbar } from './components/common/Navbar';
import { ScrollToTop } from './components/common/ScrollToTop';
import { BackToTop } from './components/common/BackToTop';
import { WhatsAppFloat } from './components/common/WhatsAppFloat';
import { CyberChatbot } from './components/chat/CyberChatbot';
import { Footer } from './components/footer/Footer';

// Restructured Target Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { InstitutionsWorkshopsPage } from './pages/InstitutionsWorkshopsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

// Additional Logically Retained Pages
import { FounderPatentsPage } from './pages/FounderPatentsPage';
import { CommunityPage } from './pages/CommunityPage';
import { CyberRangePage } from './pages/CyberRangePage';
import { EstimatorPage } from './pages/EstimatorPage';

// Modals & Drawers
import { B2BAuditModal } from './components/modals/B2BAuditModal';
import { B2CDemoModal } from './components/modals/B2CDemoModal';
import { CourseSyllabusDrawer } from './components/modals/CourseSyllabusDrawer';
import { ResponsibleDisclosureModal } from './components/modals/ResponsibleDisclosureModal';
import { AcademyCourse } from './data/cyberData';

// Dynamic Redirect Helper for Nested Legacy Routes
const LegacyServiceRedirect: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  return <Navigate to={`/services/${serviceId || ''}`} replace />;
};

const LegacyCourseRedirect: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  return <Navigate to={`/courses/${courseId || ''}`} replace />;
};

export function App() {
  // Modal & Drawer States
  const [b2bAuditModalOpen, setB2bAuditModalOpen] = useState(false);
  const [b2cDemoModalOpen, setB2cDemoModalOpen] = useState(false);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState<string | undefined>(undefined);
  const [disclosureModalOpen, setDisclosureModalOpen] = useState(false);
  const [prefilledScope, setPrefilledScope] = useState<any>(null);

  // Syllabus Drawer State
  const [selectedSyllabusCourse, setSelectedSyllabusCourse] = useState<AcademyCourse | null>(null);
  const [syllabusDrawerOpen, setSyllabusDrawerOpen] = useState(false);

  // Handlers
  const handleOpenAuditModal = (serviceTitle?: string) => {
    setPrefilledScope(serviceTitle ? { serviceTitle } : null);
    setB2bAuditModalOpen(true);
  };

  const handleOpenAuditWithScope = (scopeDetails: any) => {
    setPrefilledScope(scopeDetails);
    setB2bAuditModalOpen(true);
  };

  const handleOpenDemoModal = (courseTitle?: string) => {
    setSelectedCourseTitle(courseTitle);
    setB2cDemoModalOpen(true);
  };

  const handleOpenSyllabusDrawer = (course: AcademyCourse) => {
    setSelectedSyllabusCourse(course);
    setSyllabusDrawerOpen(true);
  };

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        
        <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-200 selection:text-rose-950 luxury-grid-bg">
          
          {/* Interactive Particle Mesh */}
          <CanvasBackground />

          {/* Sticky Luxury Navbar with Restructured IA & Mega Menus */}
          <Navbar
            onRequestConsultation={() => handleOpenAuditModal('Executive Cyber Consultation')}
            onRequestAudit={() => handleOpenAuditModal('Full-Stack VAPT Audit')}
            onBookDemo={handleOpenDemoModal}
          />

          {/* Main Content Area Rendering SPA Route Pages */}
          <main className="relative z-10 min-h-[70vh]">
            <Routes>
              
              {/* 1. Home */}
              <Route
                path="/"
                element={
                  <HomePage
                    onRequestAudit={handleOpenAuditModal}
                    onBookDemo={handleOpenDemoModal}
                  />
                }
              />

              {/* 2. Services Overview & 8 Dedicated Service Pages */}
              <Route
                path="/services"
                element={
                  <ServicesPage
                    onRequestAudit={handleOpenAuditModal}
                  />
                }
              />
              <Route
                path="/services/:slug"
                element={
                  <ServiceDetailPage
                    onRequestAudit={handleOpenAuditModal}
                  />
                }
              />

              {/* 3. Courses Overview & 5 Dedicated Course Pages */}
              <Route
                path="/courses"
                element={
                  <CoursesPage
                    onBookDemo={handleOpenDemoModal}
                    onDownloadSyllabus={handleOpenDemoModal}
                  />
                }
              />
              <Route
                path="/courses/:slug"
                element={
                  <CourseDetailPage
                    onBookDemo={handleOpenDemoModal}
                  />
                }
              />

              {/* 4. Institutions & Workshops */}
              <Route
                path="/institutions-workshops"
                element={
                  <InstitutionsWorkshopsPage
                    onRequestConsultation={handleOpenAuditModal}
                  />
                }
              />

              {/* 5. Portfolio redirect */}
              <Route
                path="/portfolio"
                element={<Navigate to="/" replace />}
              />

              {/* 6. About Us */}
              <Route
                path="/about-us"
                element={
                  <AboutUsPage
                    onRequestConsultation={handleOpenAuditModal}
                    onRequestAudit={handleOpenAuditModal}
                  />
                }
              />

              {/* 7. Gallery */}
              <Route
                path="/gallery"
                element={<GalleryPage />}
              />

              {/* 8. Blog Directory & Article Reader */}
              <Route
                path="/blog"
                element={<BlogPage />}
              />
              <Route
                path="/blog/:slug"
                element={<BlogPostPage />}
              />

              {/* 9. Contact */}
              <Route
                path="/contact"
                element={<ContactPage />}
              />

              {/* 10. Legal: Privacy Policy & Terms */}
              <Route
                path="/privacy-policy"
                element={<LegalPage />}
              />
              <Route
                path="/terms"
                element={<LegalPage />}
              />

              {/* Additional Retained Pages */}
              <Route
                path="/founder-patents"
                element={
                  <FounderPatentsPage
                    onRequestAudit={handleOpenAuditModal}
                    onBookExecutiveAdvisory={() => handleOpenAuditModal('Executive Advisory with Dinesh Paranthagan')}
                  />
                }
              />
              <Route
                path="/cyber-range"
                element={
                  <CyberRangePage
                    onRequestDemo={() => handleOpenDemoModal('Cyber Range Live Sandbox Access')}
                  />
                }
              />
              <Route
                path="/community"
                element={
                  <CommunityPage
                    onGetInvolved={(title) => handleOpenDemoModal(title)}
                  />
                }
              />
              <Route
                path="/estimate"
                element={
                  <EstimatorPage
                    onRequestAuditWithScope={handleOpenAuditWithScope}
                    onEnrollCustomTrack={(track) => handleOpenDemoModal(track.recommendedTrack)}
                  />
                }
              />

              {/* ---------------------------------------------------- */}
              {/* 301 CLIENT REDIRECT MAP FROM OLD ROUTES TO NEW ROUTES */}
              {/* ---------------------------------------------------- */}
              <Route path="/enterprise" element={<Navigate to="/services" replace />} />
              <Route path="/enterprise/services/:serviceId" element={<LegacyServiceRedirect />} />
              <Route path="/academy" element={<Navigate to="/courses" replace />} />
              <Route path="/academy/courses/:courseId" element={<LegacyCourseRedirect />} />
              <Route path="/about" element={<Navigate to="/about-us" replace />} />
              <Route path="/institutional-reach" element={<Navigate to="/institutions-workshops" replace />} />
              <Route path="/internship" element={<Navigate to="/courses/cyber-security-internship" replace />} />
              <Route path="/defcon" element={<Navigate to="/community" replace />} />
              <Route path="/patents" element={<Navigate to="/founder-patents" replace />} />

              {/* Fallback Wildcard Route */}
              <Route
                path="*"
                element={
                  <HomePage
                    onRequestAudit={handleOpenAuditModal}
                    onBookDemo={handleOpenDemoModal}
                  />
                }
              />
            </Routes>
          </main>

          {/* Luxury Minimalist Footer */}
          <Footer
            onRequestConsultation={() => handleOpenAuditModal('General Consultation')}
            onOpenDisclosure={() => setDisclosureModalOpen(true)}
          />

          {/* Floating AI Cyber Assistant Chatbot */}
          <CyberChatbot
            onOpenAudit={handleOpenAuditModal}
            onBookDemo={handleOpenDemoModal}
          />

          {/* Floating Scroll Progress & Back To Top Control */}
          <BackToTop />

          {/* Floating WhatsApp Quick Contact Button */}
          <WhatsAppFloat />

          {/* Modals & Drawers */}
          <B2BAuditModal
            isOpen={b2bAuditModalOpen}
            onClose={() => setB2bAuditModalOpen(false)}
            prefilledScope={prefilledScope}
          />

          <B2CDemoModal
            isOpen={b2cDemoModalOpen}
            onClose={() => setB2cDemoModalOpen(false)}
            prefilledCourseTitle={selectedCourseTitle}
          />

          <CourseSyllabusDrawer
            course={selectedSyllabusCourse}
            isOpen={syllabusDrawerOpen}
            onClose={() => setSyllabusDrawerOpen(false)}
            onBookDemo={handleOpenDemoModal}
          />

          <ResponsibleDisclosureModal
            isOpen={disclosureModalOpen}
            onClose={() => setDisclosureModalOpen(false)}
          />

        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
