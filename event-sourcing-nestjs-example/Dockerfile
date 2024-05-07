# ใช้ภาพ Node.js อย่างเป็นทางการเป็นฐาน
FROM node:21

# ตั้งค่าไดเรกทอรีทำงานในคอนเทนเนอร์
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json ไปยังไดเรกทอรีทำงาน
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install -g npm@10.7.0

# คัดลอกส่วนที่เหลือของโค้ดแอปพลิเคชัน
COPY . .

# Expose port 300
EXPOSE 3005

# คำสั่งในการเริ่มต้นแอปพลิเคชัน
# "start:dev"
CMD ["npm", "run", "start"]


# FROM node:16-alpine

# WORKDIR /app

# COPY package-lock.json package.json ./

# RUN npm install

# COPY . .

# EXPOSE 3005

# CMD ["npm", "start"]
