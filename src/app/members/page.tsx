"use client";

import ChromaGrid from '@/components/ChromaGrid/ChromaGrid';
import { leaders } from '@/statics/members';

export default function PeoplesPage() {
  return (
    <>
      <h1 className="text-6xl font-bold mb-12">Meet GeekPie</h1>

      <h2 className="text-5xl font-bold mb-12">Leaders</h2>
      <div style={{ height: 'auto', position: 'relative' }}>
        <ChromaGrid
          items={leaders}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
          />
      </div>

      {/* <h2 className="text-5xl font-bold my-12">Members</h2>       */}
    </>
  );
}