export interface Review {
  name: string
  rating: number
  text: string
}

export const reviews: Review[] = [
  { name: 'Rahul Sharma', rating: 5, text: 'Zarnetic handled our NGO registration flawlessly. Highly professional team!' },
  { name: 'Sarah Jenkins', rating: 5, text: 'Exceptional custom software delivery. They scaled our startup infrastructure perfectly.' },
  { name: 'Ahmed Khan', rating: 5, text: 'Best IT consultancy in Delhi. Their legal compliance team is top-notch.' },
  { name: 'Priya Patel', rating: 5, text: 'FSSAI and Company registration done super fast. Highly recommended!' },
  { name: 'David Miller', rating: 5, text: 'Our AWS migration was seamless thanks to their Cloud DevOps experts.' },
  { name: 'Anita Desai', rating: 5, text: 'Got our 12A and 80G certificates without any hassle. Great support and transparency.' },
  { name: 'Rohan Gupta', rating: 4, text: 'Their cybersecurity audit saved us from major vulnerabilities. Very thorough work.' },
  { name: 'Emily Chen', rating: 5, text: 'Fantastic UI/UX design for our new mobile app. The Zarnetic team is brilliant.' },
  { name: 'Vikram Singh', rating: 5, text: 'FCRA registration is usually a nightmare, but they made it look incredibly easy.' },
  { name: 'Aisha Rahman', rating: 5, text: 'Developed a custom CRM that boosted our sales by 40%. Worth every single penny.' },
  { name: 'Carlos Gomez', rating: 5, text: 'Top-tier AI and Data Science solutions. They really understand modern tech scaling.' },
  { name: 'Neha Kapoor', rating: 5, text: 'Company incorporation was done in record time. Excellent legal guidance from Adv. Rahimullah.' },
  { name: 'John Smith', rating: 4, text: 'Very responsive team and transparent pricing. Delivered the project before the deadline.' },
  { name: 'Karan Malhotra', rating: 5, text: 'The best tech partners we\'ve ever worked with. Highly scalable microservices architecture.' },
  { name: 'Sofia Ali', rating: 5, text: 'Helped us set up our entire digital infrastructure from scratch. Amazing end-to-end work.' },
  { name: 'Rajesh Verma', rating: 5, text: 'Annual audits and tax compliance handled professionally year after year. Total peace of mind.' },
  { name: 'Lisa Wong', rating: 5, text: 'Their strategic IT consulting completely transformed our daily operations and workflow.' },
  { name: 'Amit Kumar', rating: 5, text: 'Fast, reliable, and secure web development. Zarnetic is our go-to agency for everything digital.' },
  { name: 'Sneha Reddy', rating: 5, text: 'Got my restaurant\'s FSSAI license quickly. Very helpful staff who guided me through every step.' },
  { name: 'Michael Brown', rating: 4, text: 'Outstanding penetration testing services. Our fintech platform is much safer now.' },
  { name: 'Pooja Joshi', rating: 5, text: 'From website design to legal compliance, they do it all perfectly under one roof.' },
  { name: 'Tariq Mahmood', rating: 5, text: 'They built a robust e-commerce platform for us. Zero downtime so far during peak sales!' },
  { name: 'Emma Wilson', rating: 5, text: 'Incredible attention to detail in their software engineering process. Highly structured approach.' },
  { name: 'Sanjay Das', rating: 5, text: 'NGO registration process was so smooth. I didn\'t have to worry about running to any offices.' },
  { name: 'Alex Turner', rating: 5, text: 'Highly recommend Zarnetic for elite business solutions. A truly global standard team.' },
]

export const reviewStats = {
  platform: 'Google',
  rating: '4.9',
  totalReviews: '70+',
} as const

