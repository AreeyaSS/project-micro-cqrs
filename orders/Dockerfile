# ใช้ภาพ Node.js อย่างเป็นทางการเป็นฐาน
FROM node:21

# ตั้งค่าไดเรกทอรีทำงานในคอนเทนเนอร์
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json ไปยังไดเรกทอรีทำงาน
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกส่วนที่เหลือของโค้ดแอปพลิเคชัน
COPY . .

# Expose port 3001
# EXPOSE 3001

# คำสั่งในการเริ่มต้นแอปพลิเคชัน
# "start:dev"
CMD ["npm", "run", "start"]