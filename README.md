# Warehouse(ombor) Operation Management loyhasi uchun API 🏗 

## 🎯Loyhaning maqsadi
- Asosiy pageda loyhani ishlatish uchun turorial bolishi kk
- Asosiy pageda yana Warehouse management button bulishi kk
- Asosiy oynaga sign in ham bo'lishi kk 
- Clientlar turli xildagi Warehouselardan birini tanlaydilar
- Bizda esa turtxildagi Warehouse bo'ladi 
- Bu loyha istalgan ombor uchun kirdi chiqdini boshqarishga yordam beradi 
- Omborga kiritilgan narsalarni bitta guruhga boshqarishga yordam beradi
- Har bir narsadan qancha chiqqan va qancha qolganini aytib beradi 
- Agar omborda biror narsadan kam qolsa ownerga ogohlantiruvchi xabar jo'natadi 
- Mansulotlarni qancha borligi uchun turli xil o'lchov birliglari bor (kg,ta,m3)
- Ombor egasi o'zini ishchisini omborga ula olishi kk




## 🏗 Warehouse turlari
- Boshida limited warehouses qilmoqchi bo'ldim(masalan: oziq ovqat,qurol-yaroq va elektronik narsalar) ammo nimaga limited istaganicha yaratsin client loyha uchun pul to'laydi xush shunga yarasha warehouse istagan warehouseni yaratsin


## Nofunksional talablar:
- Tezlik
- Xavfsizlik
- Kengaya oladigan

## Rollar
- Super_Admin yani men hammasini boshqarib turaman
- Owner ownerlar websiteni ishlatish uchun sotib olganlar ularniga bu huquqni men beraman
- Workers Bu huquqni men va ownerlar bera olamiz ularga login va parollarni biz beramiz 

## Database model

1. Warehouse
    - Name
    - Type
    - owner
    
2. user
    - name
    - email
    - password
    - role (enum)

3. category
    - name
    - goods
    - room

4. goods
    - name 
    - imageUrl
    - category
    - location
    - volume
    - volume_type (enum)
    - entered
    - taken

