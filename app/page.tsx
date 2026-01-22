"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import InfoTab from "@/components/InfoTab";
import ProjectTab from "@/components/ProjectTab";
import ThemeToggle from "@/components/ThemeToggle";
import AdminPanel from "@/components/AdminPanel";
import AddProjectButton from "@/components/AddProjectButton";
import HeaderSocialLinks from "@/components/HeaderSocialLinks";
import {
  getAllProjects,
  getProjectStats,
  getDeveloperProfileWithSkills,
} from "@/lib/database";
import { Project, DeveloperProfile as DeveloperProfileType } from "@/types";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"info" | "project">("info");
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectStats, setProjectStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    maintenance: 0,
    archived: 0,
    inProgress: 0,
  });
  const [profile, setProfile] = useState<DeveloperProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const profileRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [projectsData, statsData, profileData] = await Promise.all([
          getAllProjects(),
          getProjectStats(),
          getDeveloperProfileWithSkills(),
        ]);

        setProjects(projectsData);
        setProjectStats(statsData);
        setProfile(profileData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 스크롤 감지로 소셜 링크 표시/숨김 처리
  useEffect(() => {
    const handleScroll = () => {
      if (profileRef.current) {
        const profileRect = profileRef.current.getBoundingClientRect();
        // 프로필 섹션의 중간 정도가 화면 상단에 위치했을 때 소셜 링크 표시
        const shouldShow = profileRect.top < -200;
        setShowSocialLinks(shouldShow);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // 초기 상태 확인
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo, Tabs, and Controls */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left: Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-semibold">K Library</span>
          </motion.div>

          {/* Center: Tab Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1"
          >
            {[
              { id: "info", label: "Info" },
              { id: "project", label: "Project" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "info" | "project")}
                className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <span className="text-sm">{tab.label}</span>

                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
          </motion.nav>

          {/* Right: Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <HeaderSocialLinks profile={profile} isVisible={showSocialLinks} />
            <AdminPanel />
            <ThemeToggle />
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tab Content */}
        <div ref={profileRef}>
          {activeTab === "info" ? (
            <InfoTab
              profile={profile}
              projectStats={projectStats}
              loading={loading}
              onProfileUpdated={async () => {
                const updatedProfile = await getDeveloperProfileWithSkills();
                setProfile(updatedProfile);
              }}
            />
          ) : (
            <ProjectTab
              projects={projects}
              loading={loading}
              error={error}
              onProjectUpdated={() => window.location.reload()}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/95 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-muted-foreground"
          >
            <p>
              © 2026 Kuneosu Library.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Admin Floating Button */}
      <AddProjectButton />
    </div>
  );
}
