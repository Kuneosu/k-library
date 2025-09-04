"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DeveloperProfile from "@/components/DeveloperProfile";
import ProjectGrid from "@/components/ProjectGrid";
import ThemeToggle from "@/components/ThemeToggle";
import AdminPanel from "@/components/AdminPanel";
import AddProjectButton from "@/components/AddProjectButton";
import { developerProfile } from "@/data/mockData";
import {
  getAllProjects,
  getProjectStats,
  getDeveloperProfileWithSkills,
} from "@/lib/database";
import { Project, DeveloperProfile as DeveloperProfileType } from "@/types";

export default function HomePage() {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Theme Toggle */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <AdminPanel />
            <ThemeToggle />
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Developer Profile Section */}
        <section className="mb-12">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">
                프로필을 불러오는 중...
              </p>
            </motion.div>
          ) : profile ? (
            <DeveloperProfile profile={profile} projectStats={projectStats} />
          ) : (
            <DeveloperProfile
              profile={developerProfile}
              projectStats={projectStats}
            />
          )}
        </section>

        {/* Projects Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-2">프로젝트</h2>
            <p className="text-muted-foreground">
              다양한 기술과 아이디어로 구현한 사이드 프로젝트들을 살펴보세요.
            </p>
          </motion.div>

          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                다시 시도
              </button>
            </motion.div>
          ) : loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">
                프로젝트를 불러오는 중...
              </p>
            </motion.div>
          ) : (
            <ProjectGrid
              projects={projects}
              onProjectUpdated={() => window.location.reload()}
            />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/95 backdrop-blur mt-20">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-muted-foreground"
          >
            <p className="mb-2">
              © 2025 Kuneosu Library. Built with Next.js, TypeScript, and
              Tailwind CSS.
            </p>
            <p className="text-sm">
              지속적으로 학습하고 성장하는 개발자의 여정을 기록합니다.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Admin Floating Button */}
      <AddProjectButton />
    </div>
  );
}
