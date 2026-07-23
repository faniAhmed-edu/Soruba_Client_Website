/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: string;
  offerings: string[];
  imageUrl: string;
  slug: string;
}

export interface Industry {
  id: string;
  title: string;
  text: string;
  icon: string;
  imageUrl: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  slug: string;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  slug: string;
  skills: { name: string; percentage: number }[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
  slug: string;
  tags: string[];
  author: string;
}

export interface Testimonial {
  id: string;
  title: string;
  body: string;
  clientName: string;
  clientRole: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
