import os
import sys
from PIL import Image, ImageDraw, ImageFont

os.makedirs('presentation_assets', exist_ok=True)

def get_font(size, bold=False):
    # Try Windows system fonts, fall back to default
    font_paths = [
        "C:\\Windows\\Fonts\\arialbd.ttf" if bold else "C:\\Windows\\Fonts\\arial.ttf",
        "C:\\Windows\\Fonts\\segoeuib.ttf" if bold else "C:\\Windows\\Fonts\\segoeui.ttf",
        "C:\\Windows\\Fonts\\calibrib.ttf" if bold else "C:\\Windows\\Fonts\\calibri.ttf"
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return ImageFont.load_default()

# 1. House Analogy Diagram (800x450)
def create_house_analogy():
    img = Image.new('RGB', (1000, 520), color='#F8FAFC')
    draw = ImageDraw.Draw(img)
    
    # Title Banner
    draw.rectangle([(0, 0), (1000, 70)], fill='#0F172A')
    f_title = get_font(26, bold=True)
    draw.text((30, 20), "The 'House' Analogy: How a Website Works", fill='#FFFFFF', font=f_title)
    
    cards = [
        {"title": "1. The Exterior & Paint", "tech": "FRONTEND (HTML & CSS)", "desc": "What visitors see & touch:\n• Walls & Windows (HTML)\n• Colors & Decoration (CSS)\n• Doorbells & Lights (JS)", "color": "#2563EB", "x": 40},
        {"title": "2. Wiring & Plumbing", "tech": "BACKEND (Server Logic)", "desc": "The hidden systems:\n• Pipes carrying water\n• Electrical circuits\n• Processes requests & actions", "color": "#0D9488", "x": 280},
        {"title": "3. The Storage Vault", "tech": "DATABASE (Data Storage)", "desc": "Where things are kept:\n• Locked filing cabinets\n• Student records & books\n• Safe & persistent storage", "color": "#D97706", "x": 520},
        {"title": "4. Plot & Address", "tech": "CLOUD DEPLOYMENT", "desc": "How people find you:\n• Street Address (Domain/URL)\n• 24/7 Open Land (Cloud Host)\n• Anyone can visit worldwide", "color": "#7C3AED", "x": 760}
    ]
    
    f_card_t = get_font(18, bold=True)
    f_card_tech = get_font(13, bold=True)
    f_card_d = get_font(14)
    
    for c in cards:
        x = c['x']
        draw.rounded_rectangle([(x, 100), (x + 200, 480)], radius=12, fill='#FFFFFF', outline='#E2E8F0', width=2)
        draw.rounded_rectangle([(x, 100), (x + 200, 160)], radius=12, fill=c['color'])
        draw.rectangle([(x, 145), (x + 200, 160)], fill=c['color'])
        
        draw.text((x + 12, 112), c['title'], fill='#FFFFFF', font=f_card_t)
        draw.text((x + 12, 137), c['tech'], fill='#E0F2FE', font=f_card_tech)
        draw.text((x + 15, 185), c['desc'], fill='#334155', font=f_card_d, spacing=10)
        
    img.save('presentation_assets/house_analogy.png')
    print("✓ Created house_analogy.png")

# 2. End-to-End Pipeline Diagram (1000x480)
def create_pipeline():
    img = Image.new('RGB', (1000, 480), color='#0F172A')
    draw = ImageDraw.Draw(img)
    
    f_title = get_font(26, bold=True)
    draw.text((40, 25), "5-Stage End-to-End Web Development Roadmap", fill='#38BDF8', font=f_title)
    
    steps = [
        {"num": "1", "name": "Ideate & Plan", "sub": "Who needs what?", "color": "#3B82F6"},
        {"num": "2", "name": "UI/UX Design", "sub": "Drawing the screen", "color": "#10B981"},
        {"num": "3", "name": "Frontend Build", "sub": "Structure & Style", "color": "#F59E0B"},
        {"num": "4", "name": "Connect Database", "sub": "Storage & Security", "color": "#8B5CF6"},
        {"num": "5", "name": "Cloud Launch", "sub": "Live to the World", "color": "#EC4899"}
    ]
    
    f_num = get_font(32, bold=True)
    f_step = get_font(16, bold=True)
    f_sub = get_font(13)
    f_arrow = get_font(24, bold=True)
    
    start_x = 40
    step_w = 160
    gap = 35
    
    for i, s in enumerate(steps):
        x = start_x + i * (step_w + gap)
        y = 120
        # Card
        draw.rounded_rectangle([(x, y), (x + step_w, y + 280)], radius=14, fill='#1E293B', outline=s['color'], width=3)
        # Circle badge
        draw.ellipse([(x + step_w//2 - 25, y + 25), (x + step_w//2 + 25, y + 75)], fill=s['color'])
        draw.text((x + step_w//2 - 9, y + 32), s['num'], fill='#FFFFFF', font=f_num)
        
        # Text
        draw.text((x + 12, y + 110), s['name'], fill='#FFFFFF', font=f_step)
        draw.text((x + 12, y + 145), s['sub'], fill='#94A3B8', font=f_sub)
        
        # Key takeaway
        bullets = ["• Requirements\n• Feature list", "• Wireframes\n• Mobile view", "• HTML / CSS\n• Buttons & inputs", "• Passwords\n• Student tables", "• Free hosting\n• HTTPS domain"][i]
        draw.text((x + 12, y + 190), bullets, fill='#CBD5E1', font=f_sub, spacing=6)
        
        # Arrow
        if i < len(steps) - 1:
            draw.text((x + step_w + 10, y + 130), "➔", fill='#64748B', font=f_arrow)
            
    img.save('presentation_assets/pipeline.png')
    print("✓ Created pipeline.png")

# 3. Three Portals Visual (1000x480)
def create_portals_graphic():
    img = Image.new('RGB', (1000, 480), color='#F8FAFC')
    draw = ImageDraw.Draw(img)
    
    draw.rectangle([(0, 0), (1000, 70)], fill='#1E3A8A')
    f_title = get_font(26, bold=True)
    draw.text((30, 20), "Role-Based Architecture: 3 Doors, One College Portal", fill='#FFFFFF', font=f_title)
    
    portals = [
        {
            "role": "STUDENT PORTAL",
            "icon": "🎓",
            "for_who": "For: College Students",
            "color": "#1E40AF",
            "items": ["• View Attendance & Timetable", "• Download Subject Notes", "• Access Central Digital Library", "• View Exam Results & Notices", "• Clean & Simple Mobile View"],
            "x": 50
        },
        {
            "role": "FACULTY PORTAL",
            "icon": "👨‍🏫",
            "for_who": "For: Professors & Lecturers",
            "color": "#065F46",
            "items": ["• Mark Daily Class Attendance", "• Post Assignments & Tasks", "• Upload Department Notices", "• Track Student Progress", "• Manage Subject Workload"],
            "x": 370
        },
        {
            "role": "ADMIN CONSOLE",
            "icon": "🛡️",
            "for_who": "For: Management & HODs",
            "color": "#B45309",
            "items": ["• Enroll New Student IDs", "• Add / Remove Faculty Staff", "• Publish College Notifications", "• Manage Central Library", "• Full System Control"],
            "x": 690
        }
    ]
    
    f_role = get_font(18, bold=True)
    f_sub = get_font(13, bold=True)
    f_item = get_font(14)
    
    for p in portals:
        x = p['x']
        draw.rounded_rectangle([(x, 100), (x + 260, 440)], radius=12, fill='#FFFFFF', outline='#E2E8F0', width=2)
        draw.rounded_rectangle([(x, 100), (x + 260, 160)], radius=12, fill=p['color'])
        draw.rectangle([(x, 145), (x + 260, 160)], fill=p['color'])
        
        draw.text((x + 15, 112), p['role'], fill='#FFFFFF', font=f_role)
        draw.text((x + 15, 137), p['for_who'], fill='#D1FAE5' if '065' in p['color'] else ('#FEF3C7' if 'B45' in p['color'] else '#DBEAFE'), font=f_sub)
        
        y_text = 185
        for item in p['items']:
            draw.text((x + 15, y_text), item, fill='#334155', font=f_item)
            y_text += 45
            
    img.save('presentation_assets/portals.png')
    print("✓ Created portals.png")

create_house_analogy()
create_pipeline()
create_portals_graphic()
