"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PageLayout from "@/app/components/PageLayout";

interface GitHubProfile {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
}

const teamMembers = [
  "EsaiPhillips",  
  "BlakeTorrey",
  "ricardoshade",
  "Keaton007"
];

export default function AboutPage() {
  const [profiles, setProfiles] = useState<GitHubProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilePromises = teamMembers.map(username =>
          fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
        );
        const results = await Promise.all(profilePromises);
        setProfiles(results);
      } catch (error) {
        console.error("Error fetching GitHub profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Meet Our Team</h1>
          <p className="text-white/80 text-lg">
            The innovative minds behind Virtual Garage, dedicated to revolutionizing your automotive experience.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f26522]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profiles.map((profile) => (
              <div 
                key={profile.login}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 border border-white/10 hover:border-[#f26522]/30"
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#f26522]/20 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                    <Image
                      src={profile.avatar_url}
                      alt={`${profile.name || profile.login}'s avatar`}
                      width={120}
                      height={120}
                      className="rounded-full relative ring-2 ring-white/20 group-hover:ring-[#f26522]/50 transition-all"
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {profile.name || profile.login}
                  </h2>
                  <p className="text-white/60 text-center mb-6 text-sm">
                    {profile.bio || "Team Member"}
                  </p>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f26522] hover:text-white transition-colors text-sm font-medium"
                  >
                    View GitHub Profile →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
} 