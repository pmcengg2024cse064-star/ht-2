import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def generate_pdf():
    pdf_path = os.path.join(os.path.dirname(__file__), "..", "public", "downloads", "Dinesh_Paranthagan_Executive_Profile.pdf")
    pdf_path = os.path.abspath(pdf_path)
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)

    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Brand Colors
    c_burgundy = colors.HexColor("#881337")
    c_dark_burgundy = colors.HexColor("#5B0E1B")
    c_navy = colors.HexColor("#0F172A")
    c_slate = colors.HexColor("#334155")
    c_light_bg = colors.HexColor("#FFF1F2")
    c_border = colors.HexColor("#FECDD3")
    c_gold = colors.HexColor("#B45309")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=c_burgundy
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=c_navy
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=c_slate
    )

    section_hdr = ParagraphStyle(
        'SectionHdr',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_burgundy
    )

    badge_style = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=c_burgundy
    )

    stat_num = ParagraphStyle(
        'StatNum',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=16,
        textColor=c_burgundy,
        alignment=1
    )

    stat_label = ParagraphStyle(
        'StatLabel',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        textColor=c_slate,
        alignment=1
    )

    story = []

    # 1. Header with Photo & Title
    img_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "images", "dr_dinesh_paranthagan.jpg"))
    logo_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "images", "hackup_logo.png"))
    
    header_data = []
    
    founder_img = None
    if os.path.exists(img_path):
        founder_img = Image(img_path, width=1.1*inch, height=1.35*inch)

    bio_header_text = [
        Paragraph("HACKUP TECHNOLOGY PVT LTD &bull; EXECUTIVE DOSSIER", ParagraphStyle('Eyebrow', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, textColor=c_gold)),
        Paragraph("Dr. Dinesh Paranthagan <font size=10 color='#475569'>M.C.A., Ph.D.</font>", title_style),
        Paragraph("Founder & Chief Executive Officer &bull; Secretary General, TANCCAO", subtitle_subtitle := ParagraphStyle('Sub', parent=subtitle_style, fontSize=10, textColor=c_burgundy)),
        Paragraph("Technical Consultant to Tamil Nadu Police Cyber Crime Dept &bull; Holder of 2 Patents", ParagraphStyle('Roles', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=c_navy)),
        Paragraph("Email: dinesh@hackuptechnology.com | Phone: +91 93620 12339 | HQ: Ganapathy, Coimbatore", ParagraphStyle('Contact', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=11, textColor=c_slate))
    ]

    header_table = Table([[founder_img, bio_header_text]], colWidths=[1.3*inch, 6.1*inch])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('LEFTPADDING', (1, 0), (1, 0), 10),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_burgundy, spaceAfter=10, spaceBefore=0))

    # 2. Executive Bio
    story.append(Paragraph("EXECUTIVE BIOGRAPHY", section_hdr))
    story.append(Spacer(1, 4))
    bio_p = Paragraph(
        "<b>Dinesh Paranthagan</b> is the Founder & CEO of Hackup Technology and a cybersecurity practitioner with over 13 years of experience as an ethical hacker and penetration tester. "
        "His work spans VAPT, SOC implementation, digital forensics, cybercrime investigation, GRC consulting, red and blue team engagements, IoT security and AI-integrated cybersecurity. "
        "He has supported cyber crime investigations. A regular voice on Tamil media and a sought-after resource person for colleges, Dinesh is passionate about turning students into skilled, ethical defenders.",
        body_style
    )
    
    bio_box = Table([[bio_p]], colWidths=[7.4*inch])
    bio_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), c_light_bg),
        ('BOX', (0, 0), (-1, -1), 1, c_border),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(bio_box)
    story.append(Spacer(1, 10))

    # 3. Verified Enterprise & National Statistics
    stats_data = [
        [
            Paragraph("2013", stat_num),
            Paragraph("13+ Yrs", stat_num),
            Paragraph("2,100+", stat_num),
            Paragraph("1,00,000+", stat_num),
            Paragraph("2 Patents", stat_num),
            Paragraph("54+ / 7", stat_num)
        ],
        [
            Paragraph("Founded In Coimbatore", stat_label),
            Paragraph("Offensive Security Practice", stat_label),
            Paragraph("Enterprise Audits", stat_label),
            Paragraph("Trained Defenders", stat_label),
            Paragraph("Published Patents", stat_label),
            Paragraph("Colleges & MNCs", stat_label)
        ]
    ]
    stats_table = Table(stats_data, colWidths=[1.23*inch]*6)
    stats_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, 0), 6),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 2),
        ('TOPPADDING', (0, 1), (-1, 1), 2),
        ('BOTTOMPADDING', (0, 1), (-1, 1), 6),
    ]))
    story.append(stats_table)
    story.append(Spacer(1, 12))

    # 4. Key Contributions & Leadership
    story.append(Paragraph("LEADERSHIP ROLES & GOVERNMENT CONSULTING", section_hdr))
    story.append(Spacer(1, 4))
    
    roles_data = [
        [
            Paragraph("<b>Secretary General &bull; TANCCAO</b><br/>Directs the Tamil Nadu Cyber Crime Action Organisation, coordinating public cyber resilience, corporate defense intelligence, and statewide cybersecurity initiatives.", body_style),
            Paragraph("<b>Consultant &bull; TN Police Cyber Crime Dept</b><br/>Provides direct technical assistance in complex digital forensics, cryptocurrency tracing, dark web investigations, ransomware incident response, and Section 65B evidence preservation.", body_style)
        ],
        [
            Paragraph("<b>Board of Studies Member &bull; 8 Universities</b><br/>Advises university academic boards and autonomous collegiate councils on modernizing B.Tech, M.Tech, and BCA/MCA cybersecurity curricula with hands-on red team labs.", body_style),
            Paragraph("<b>National Mentor &bull; Smart India Hackathon</b><br/>Appointed under the Ministry of Education & AICTE to evaluate and mentor premier engineering teams building indigenous national defense technologies.", body_style)
        ],
        [
            Paragraph("<b>Dual Cyber Patent Holder &bull; 2 Published Patents</b><br/>Inventor of two published Indian cybersecurity patents for sovereign threat defense, automated testing, and next-generation firewall technologies.", body_style),
            Paragraph("<b>DEFCON Coimbatore Chapter &bull; Lead Organizer</b><br/>Leads community cyber awareness, zero-day research disclosure, and ethical hacking knowledge sharing through DEFCON Coimbatore.", body_style)
        ]
    ]
    roles_table = Table(roles_data, colWidths=[3.7*inch, 3.7*inch])
    roles_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.white),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#F1F5F9")),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(roles_table)
    story.append(Spacer(1, 12))

    # 5. Core Practice & Technical Competencies
    story.append(Paragraph("CORE PRACTICE & TECHNICAL DOMAINS", section_hdr))
    story.append(Spacer(1, 4))
    
    tech_text = (
        "&bull; <b>Offensive Security:</b> Vulnerability Assessment & Penetration Testing (Web, Mobile, Cloud, Network, API, IoT)<br/>"
        "&bull; <b>Security Operations:</b> 24/7 Managed SOC implementation, SIEM tuning, threat hunting, and incident triage<br/>"
        "&bull; <b>Digital Forensics & Law Enforcement:</b> Chain of custody, memory analysis, Section 65B Indian Evidence Act certification<br/>"
        "&bull; <b>GRC & Regulatory Frameworks:</b> DPDP Act 2023, ISO 27001, CERT-In compliance, RBI cyber security frameworks<br/>"
        "&bull; <b>Academic & Institutional:</b> Cyber Centers of Excellence (CoE), AICTE Faculty Development Programmes (FDPs)"
    )
    tech_table = Table([[Paragraph(tech_text, body_style)]], colWidths=[7.4*inch])
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F8FAFC")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(tech_table)
    story.append(Spacer(1, 10))

    # Footer note
    footer_text = Paragraph(
        "<b>Hackup Technology Pvt Ltd</b> &bull; Founded 2013 &bull; EC-Council Accredited Training Center &bull; Coimbatore, Tamil Nadu, India<br/>"
        "Official Website: https://hackuptechnology.com &bull; Confidential Executive Profile",
        ParagraphStyle('Footer', parent=styles['Normal'], fontName='Helvetica', fontSize=7.5, leading=10, textColor=colors.HexColor("#64748B"), alignment=1)
    )
    story.append(footer_text)

    doc.build(story)
    print("Generated PDF successfully:", pdf_path)

if __name__ == "__main__":
    generate_pdf()
