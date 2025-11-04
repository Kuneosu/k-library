"use client";

import { motion } from "framer-motion";
import ProjectGrid from "@/components/ProjectGrid";
import { Project } from "@/types";

interface ProjectTabProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onProjectUpdated: () => void;
}

export default function ProjectTab({
  projects,
  loading,
  error,
  onProjectUpdated
}: ProjectTabProps) {
  if (error) {
    return (
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
    );
  }

  if (loading) {
    return (
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
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[600px]"
    >
      {/* Projects Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">프로젝트</h2>
        <p className="text-muted-foreground">
          다양한 기술과 아이디어로 구현한 사이드 프로젝트들을 살펴보세요.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ProjectGrid
          projects={projects}
          onProjectUpdated={onProjectUpdated}
        />
      </motion.div>
    </motion.div>
  );
}