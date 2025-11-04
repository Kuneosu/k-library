"use client";

import { motion } from "framer-motion";
import DeveloperProfile from "@/components/DeveloperProfile";
import { DeveloperProfile as DeveloperProfileType } from "@/types";

interface InfoTabProps {
  profile: DeveloperProfileType | null;
  projectStats: {
    total: number;
    active: number;
    completed: number;
    maintenance: number;
    archived: number;
    inProgress: number;
  };
  loading: boolean;
  onProfileUpdated?: () => Promise<void>;
}

export default function InfoTab({
  profile,
  projectStats,
  loading,
  onProfileUpdated
}: InfoTabProps) {
  if (loading) {
    return (
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
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[600px]"
    >
      {/* Developer Profile Section */}
      <section className="mb-12">
        {profile ? (
          <DeveloperProfile
            profile={profile}
            projectStats={projectStats}
            onProfileUpdated={onProfileUpdated}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">프로필 정보를 불러올 수 없습니다.</p>
          </div>
        )}
      </section>
    </motion.div>
  );
}