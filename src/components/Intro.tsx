'use client';
import { useGSAP } from '@gsap/react';
import React from 'react'
import { SplitText } from 'gsap/all';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin, SplitText);

const Intro = () => {

  useGSAP(() => {
    const hello = SplitText.create("#desc", { type: "lines,words" });

    const tl = gsap.timeline({delay: 0.5});
    tl.to("#hello", { duration: 1, text: "Hello, my name is", ease: "none", delay: 0.2 });
    tl.to("#name", { duration: 1, text: "Devendra Kumar", ease: "none", delay: 0.2 });
    tl.to("#work", { duration: 1, text: "And I am a Software Engineer.", ease: "none", delay: 0.2 });
    tl.from(hello.lines, {
      rotationX: -100,
      transformOrigin: "50% 50% -100px",
      opacity: 0,
      duration: 0.8,
      ease: "power3",
      stagger: 0.25
    });
  }, []);

  return (
    <main className='mt-[90px] p-4 max-w-[1100px] mx-auto'>
      <p id="hello" className='text-base font-normal mb-1'></p>
      <h4 id="name" className='text-3xl md:text-7xl font-bold text-primary mb-1'></h4>
      <h4 id="work" className='text-3xl md:text-7xl font-bold  text-green-700 mb-2'></h4>
      <p id="desc" className='text-lg font-normal'>
        Frontend-focused Full Stack Developer with <strong>7+ years</strong> of experience designing and delivering enterprise-grade applications in finance, fitness, and event management domains. Skilled in building scalable and maintainable solutions using <strong>React.js, Angular, Node.js, Express.js, MySQL/MariaDB, and AWS</strong>. Experienced in <strong>UI architecture, API integration, cloud services, and real-time applications</strong> with <strong>Socket.io and REST APIs</strong>. Proven leadership in <strong>team management, Agile delivery, mentoring, and architecture design</strong>, ensuring high-quality code and user-focused experiences. Passionate about modern <strong>JavaScript frameworks, performance optimization, and cloud-based application development</strong>.
      </p>
    </main>
  )
}

export default Intro;