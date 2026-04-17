"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  LayoutDashboard,
  Users,
  FolderGit2,
  FileText,
  BookOpen,
  Settings,
  BarChart3,
  Search,
  Eye,
  Plus,
  Edit,
  Trash2,
  Menu,
  Printer,
  Star,
  Handshake,
  ShoppingCart,
  X,
  Check,
  LogOut,
} from "lucide-react";
import ReceiptPrint from "@/components/admin/ReceiptPrint";
import RichTextEditor from "@/components/admin/RichTextEditor";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

// ━━ DATA TYPES ━━
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  canPost?: boolean;
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  shortDesc: string;
  category: string;
  price: number;
  status: string;
  studentId: string;
  techStack?: string;
  screenshots?: string;
  liveUrl?: string;
  repoUrl?: string;
  linkedinPost?: string;
  peopleInvolved?: string;
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  status: string;
  publishedAt: string;
  slug: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string;
}

interface Testimonial {
  id: string;
  content: string;
  author: string;
  company: string;
  role: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
}

interface Partner {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  country: string;
  isActive: boolean;
  order: number;
}

interface Product {
  id: string;
  title: string;
  shortDesc: string;
  price: number;
  comparePrice: number;
  category: string;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  images?: string;
  features?: string;
}

interface Receipt {
  id: string;
  receiptNo: string;
  total: number;
  studentId: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  items?: string;
  subtotal?: number;
  tax?: number;
  notes?: string;
  projectId?: string;
  student?: { name: string; email: string; phone?: string };
  project?: { title: string; category: string };
}

// ━━ SIDEBAR CONFIG ━━
const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", tab: "overview" },
  { icon: BarChart3, label: "Analytics", tab: "analytics" },
  { icon: Users, label: "Users", tab: "users" },
  { icon: FolderGit2, label: "Projects", tab: "projects" },
  { icon: BookOpen, label: "Blog", tab: "blog" },
  { icon: Star, label: "Testimonials", tab: "testimonials" },
  { icon: Handshake, label: "Partners", tab: "partners" },
  { icon: ShoppingCart, label: "Products", tab: "products" },
  { icon: FileText, label: "Receipts", tab: "receipts" },
  { icon: Settings, label: "Settings", tab: "settings" },
];

// ━━ MAIN DASHBOARD ━━
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  }, []);

  const currentLabel =
    sidebarItems.find((i) => i.tab === activeTab)?.label || "Dashboard";

  return (
    <div className="min-h-[80vh] bg-muted/30 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-64 bg-card border-r fixed top-16 left-0 bottom-0 z-40">
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 bg-card border-r h-full">
            <AdminSidebar
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-accent rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">{currentLabel}</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your platform
                </p>
              </div>
            </div>
            <button
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.href = '/login?role=admin';
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "testimonials" && <TestimonialsTab />}
          {activeTab === "partners" && <PartnersTab />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "receipts" && <ReceiptsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}

// ━━ SIDEBAR ━━
function AdminSidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <nav className="p-4 space-y-1">
      <div className="flex items-center gap-2 px-3 mb-6">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">CW</span>
        </div>
        <div>
          <p className="text-sm font-semibold">CYBER WEB</p>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
      </div>
      {sidebarItems.map((item) => {
        const isActive = activeTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => onTabChange(item.tab)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

// ━━ STAT CARD ━━
function StatCard({
  title,
  value,
  icon: Icon,
  change,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  change?: string;
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && <p className="text-xs text-green-600 mt-1">{change}</p>}
        </div>
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center dark:bg-orange-900/30">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}

// ━━ HELPER: EMPTY STATE ━━
function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 text-muted-foreground">
      <p className="text-sm">{message}</p>
    </div>
  );
}

// ━━ HELPER: STARS ━━
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
            }`}
        />
      ))}
    </div>
  );
}

// ━━ OVERVIEW TAB ━━
function OverviewTab() {
  const [stats, setStats] = useState({
    users: 0,
    projects: 0,
    blog: 0,
    products: 0,
    partners: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, projectsRes, blogRes, productsRes, partnersRes, testimonialsRes] =
          await Promise.all([
            fetch("/api/users").then((r) => r.json()).catch(() => []),
            fetch("/api/projects").then((r) => r.json()).catch(() => []),
            fetch("/api/blog").then((r) => r.json()).catch(() => []),
            fetch("/api/products").then((r) => r.json()).catch(() => []),
            fetch("/api/partners").then((r) => r.json()).catch(() => []),
            fetch("/api/testimonials").then((r) => r.json()).catch(() => []),
          ]);
        setStats({
          users: Array.isArray(usersRes) ? usersRes.length : 0,
          projects: Array.isArray(projectsRes) ? projectsRes.length : 0,
          blog: Array.isArray(blogRes) ? blogRes.length : 0,
          products: Array.isArray(productsRes) ? productsRes.length : 0,
          partners: Array.isArray(partnersRes) ? partnersRes.length : 0,
          testimonials: Array.isArray(testimonialsRes)
            ? testimonialsRes.length
            : 0,
        });
      } catch {
        // silently fail
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={Users}
          change="All registered users"
        />
        <StatCard
          title="Total Projects"
          value={stats.projects}
          icon={FolderGit2}
          change="Student projects"
        />
        <StatCard
          title="Blog Posts"
          value={stats.blog}
          icon={BookOpen}
          change="Published articles"
        />
        <StatCard
          title="Products"
          value={stats.products}
          icon={ShoppingCart}
          change="Store items"
        />
        <StatCard
          title="Partners"
          value={stats.partners}
          icon={Handshake}
          change="Active partnerships"
        />
        <StatCard
          title="Testimonials"
          value={stats.testimonials}
          icon={Star}
          change="Client reviews"
        />
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              {
                text: "New project registered: E-Commerce Platform",
                time: "2 hours ago",
                icon: FolderGit2,
              },
              {
                text: "New user registered: grace@example.com",
                time: "5 hours ago",
                icon: Users,
              },
              {
                text: "Contact form submitted from patrice@company.cm",
                time: "1 day ago",
                icon: FileText,
              },
              {
                text: "Blog post published: AI Trends in Cameroon",
                time: "2 days ago",
                icon: BookOpen,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ━━ USERS TAB ━━
function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleCanPost = async (user: User) => {
    try {
      await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, canPost: !user.canPost }),
      });
      fetchUsers();
    } catch {
      // silently fail
    }
  };

  const filtered = search
    ? users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    : users;

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading users...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Email</th>
                <th className="text-left p-3 font-medium">Role</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Posting</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Joined</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState message="No users found." />
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3 text-muted-foreground hidden sm:table-cell">
                      {user.email}
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={user.status === "ACTIVE" ? "default" : "secondary"}
                        className={
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {user.canPost ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Can Post
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          No Post
                        </Badge>
                      )}
                    </td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => handleToggleCanPost(user)}
                        className={`p-1.5 hover:bg-accent rounded-md transition-colors text-xs font-medium px-2 ${user.canPost
                            ? "text-amber-600 hover:text-amber-700"
                            : "text-green-600 hover:text-green-700"
                          }`}
                        title={user.canPost ? "Revoke Post Access" : "Grant Post Access"}
                      >
                        {user.canPost ? "Revoke Post" : "Grant Post"}
                      </button>
                      <button className="p-1.5 hover:bg-accent rounded-md transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ━━ PROJECTS TAB ━━
function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    category: "",
    price: "",
    status: "DRAFT",
    studentId: "",
    techStack: "",
    liveUrl: "",
    repoUrl: "",
    linkedinPost: "",
    peopleInvolved: "",
  });

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openAddForm = () => {
    setEditingItem(null);
    setForm({
      title: "",
      shortDesc: "",
      category: "",
      price: "",
      status: "DRAFT",
      studentId: "",
      techStack: "",
      liveUrl: "",
      repoUrl: "",
      linkedinPost: "",
      peopleInvolved: "",
    });
    setShowForm(true);
  };

  const openEditForm = (item: Project) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      shortDesc: item.shortDesc || "",
      category: item.category || "",
      price: String(item.price || ""),
      status: item.status || "DRAFT",
      studentId: item.studentId || "",
      techStack: item.techStack || "",
      liveUrl: item.liveUrl || "",
      repoUrl: item.repoUrl || "",
      linkedinPost: item.linkedinPost || "",
      peopleInvolved: item.peopleInvolved || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        price: Number(form.price) || 0,
      };
      if (editingItem) {
        await fetch("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });
      } else {
        await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setShowForm(false);
      fetchProjects();
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      fetchProjects();
    } catch {
      // silently fail
    }
  };

  const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];
  const filtered = projects.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      !categoryFilter || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading projects...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Form */}
      {showForm && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {editingItem ? "Edit Project" : "New Project"}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-accent rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Category"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Price (XAF)</label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full h-9 rounded-md border bg-transparent px-3 text-sm dark:bg-input/30"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Student ID</label>
                <Input
                  value={form.studentId}
                  onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                  placeholder="Student ID"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Tech Stack</label>
                <Input
                  value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  placeholder="React, Node.js, etc."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Live URL</label>
                <Input
                  value={form.liveUrl}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Repo URL</label>
                <Input
                  value={form.repoUrl}
                  onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Short Description</label>
              <Textarea
                value={form.shortDesc}
                onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                placeholder="Brief description of the project"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">People Involved</label>
              <Input
                value={form.peopleInvolved}
                onChange={(e) => setForm({ ...form, peopleInvolved: e.target.value })}
                placeholder="Names of team members"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">LinkedIn Post URL</label>
              <Input
                value={form.linkedinPost}
                onChange={(e) => setForm({ ...form, linkedinPost: e.target.value })}
                placeholder="https://linkedin.com/posts/..."
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {editingItem ? "Update Project" : "Create Project"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 rounded-md border bg-transparent px-3 text-sm dark:bg-input/30"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>
        <Button
          size="sm"
          onClick={openAddForm}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-1.5" /> New Project
        </Button>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Category</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <EmptyState message="No projects found." />
                  </td>
                </tr>
              ) : (
                filtered.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3 font-medium">{project.title}</td>
                    <td className="p-3 hidden sm:table-cell">
                      <Badge variant="outline">{project.category}</Badge>
                    </td>
                    <td className="p-3">
                      {project.price
                        ? `${project.price.toLocaleString()} XAF`
                        : "—"}
                    </td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={
                          project.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : project.status === "DRAFT"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }
                      >
                        {project.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => openEditForm(project)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 hover:bg-accent rounded-md transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 hover:bg-red-50 rounded-md transition-colors text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ━━ BLOG TAB ━━
function BlogTab() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    status: "DRAFT",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    tags: "",
  });

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/blog?admin=all");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const openAddForm = () => {
    setEditingItem(null);
    setForm({
      title: "",
      category: "",
      status: "DRAFT",
      slug: "",
      content: "",
      excerpt: "",
      coverImage: "",
      tags: "",
    });
    setShowForm(true);
  };

  const openEditForm = async (item: BlogPost) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      category: item.category || "",
      status: item.status || "DRAFT",
      slug: item.slug || "",
      content: item.content || "",
      excerpt: item.excerpt || "",
      coverImage: item.coverImage || "",
      tags: item.tags || "",
    });
    // If the post doesn't have content yet, try to fetch the full post
    if (!item.content) {
      try {
        const res = await fetch(`/api/blog/${item.id}`);
        const data = await res.json();
        if (data.post) {
          setForm((f) => ({
            ...f,
            content: data.post.content || "",
            excerpt: data.post.excerpt || "",
            coverImage: data.post.coverImage || "",
            tags: data.post.tags || "",
          }));
        }
      } catch {
        // use what we have
      }
    }
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return;
    setFormLoading(true);
    try {
      const finalSlug = form.slug || generateSlug(form.title);
      const tagsArray = form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      if (editingItem) {
        await fetch("/api/blog", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            title: form.title,
            category: form.category,
            status: form.status,
            slug: finalSlug,
            content: form.content,
            excerpt: form.excerpt,
            coverImage: form.coverImage,
            tags: tagsArray,
          }),
        });
      } else {
        await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            category: form.category,
            status: form.status,
            slug: finalSlug,
            content: form.content,
            excerpt: form.excerpt,
            coverImage: form.coverImage,
            tags: tagsArray,
          }),
        });
      }
      setShowForm(false);
      fetchPosts();
    } catch {
      // silently fail
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
      fetchPosts();
    } catch {
      // silently fail
    }
  };

  const filtered = search
    ? posts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-4">
      {showForm && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                {editingItem ? "Edit Post" : "New Post"}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-accent rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Title</label>
              <Input
                value={form.title}
                onChange={(e) => {
                  const newTitle = e.target.value;
                  setForm({
                    ...form,
                    title: newTitle,
                    slug: form.slug || generateSlug(newTitle),
                  });
                }}
                placeholder="Post title"
              />
            </div>

            {/* Slug + Category + Status row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Slug</label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="url-friendly-slug"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full h-9 rounded-md border bg-transparent px-3 text-sm dark:bg-input/30"
                >
                  <option value="">Select category</option>
                  <option value="TECHNOLOGY">Technology</option>
                  <option value="AI">AI</option>
                  <option value="SEO">SEO</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="TUTORIAL">Tutorial</option>
                  <option value="COMPANY">Company</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full h-9 rounded-md border bg-transparent px-3 text-sm dark:bg-input/30"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Cover Image URL</label>
              <Input
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Excerpt</label>
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="A brief summary of the post..."
                rows={2}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Tags</label>
              <Input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="Comma-separated tags (e.g. AI, Technology, Business)"
              />
            </div>

            {/* Content - Rich Text Editor */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Content</label>
              <RichTextEditor
                value={form.content}
                onChange={(html) => setForm({ ...form, content: html })}
                placeholder="Write your blog post content here..."
                minHeight="300px"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                disabled={formLoading || !form.title.trim()}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {formLoading
                  ? "Saving..."
                  : editingItem
                    ? "Update Post"
                    : "Create Post"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search + New Post */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          size="sm"
          onClick={openAddForm}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-1.5" /> New Post
        </Button>
      </div>

      {/* Posts Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Category</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Published</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <EmptyState message="No blog posts found." />
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt=""
                            className="w-10 h-7 rounded object-cover shrink-0 bg-muted"
                          />
                        ) : (
                          <div className="w-10 h-7 rounded bg-muted/50 shrink-0 flex items-center justify-center">
                            <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                        )}
                        <span className="font-medium truncate">{post.title}</span>
                      </div>
                    </td>
                    <td className="p-3 hidden sm:table-cell">
                      <Badge variant="outline">{post.category || "—"}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant="outline"
                        className={
                          post.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                        }
                      >
                        {post.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => openEditForm(post)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 hover:bg-red-50 rounded-md transition-colors text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ━━ TESTIMONIALS TAB ━━
function TestimonialsTab() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    author: "",
    company: "",
    role: "",
    content: "",
    rating: 5,
  });

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openAddForm = () => {
    setEditingItem(null);
    setForm({ author: "", company: "", role: "", content: "", rating: 5 });
    setShowForm(true);
  };

  const openEditForm = (item: Testimonial) => {
    setEditingItem(item);
    setForm({
      author: item.author || "",
      company: item.company || "",
      role: item.role || "",
      content: item.content || "",
      rating: item.rating || 5,
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await fetch("/api/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...form }),
        });
      } else {
        await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowForm(false);
      fetchItems();
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
      fetchItems();
    } catch {
      // silently fail
    }
  };

  const handleToggleActive = async (item: Testimonial) => {
    try {
      await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isActive: !item.isActive }),
      });
      fetchItems();
    } catch {
      // silently fail
    }
  };

  const filtered = search
    ? items.filter(
      (t) =>
        t.author.toLowerCase().includes(search.toLowerCase()) ||
        t.company.toLowerCase().includes(search.toLowerCase())
    )
    : items;

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-4">
      {showForm && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {editingItem ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-accent rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Author</label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Company</label>
                <Input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Role</label>
                <Input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Job title"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Content</label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Testimonial text..."
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    onClick={() => setForm({ ...form, rating: i })}
                    className="p-0.5"
                  >
                    <Star
                      className={`w-5 h-5 transition-colors ${i <= form.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {editingItem ? "Update Testimonial" : "Add Testimonial"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search testimonials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          size="sm"
          onClick={openAddForm}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Testimonial
        </Button>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left p-3 font-medium">Author</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Company</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Role</th>
                <th className="text-left p-3 font-medium">Rating</th>
                <th className="text-left p-3 font-medium">Active</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyState message="No testimonials found." />
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{item.author}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {item.content}
                        </p>
                      </div>
                    </td>
                    <td className="p-3 hidden sm:table-cell">{item.company}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">
                      {item.role}
                    </td>
                    <td className="p-3">
                      <StarRating rating={item.rating} />
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleActive(item)}
                        className="inline-flex items-center gap-1"
                      >
                        {item.isActive ? (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            <Check className="w-3 h-3" /> Active
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                            Inactive
                          </Badge>
                        )}
                      </button>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => openEditForm(item)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(item)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                        title={item.isActive ? "Deactivate" : "Activate"}
                      >
                        {item.isActive ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5 opacity-50" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 hover:bg-red-50 rounded-md transition-colors text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ━━ PARTNERS TAB ━━
function PartnersTab() {
  const [items, setItems] = useState<Partner[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    website: "",
    logo: "",
    country: "",
    order: 0,
  });

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openAddForm = () => {
    setEditingItem(null);
    setForm({
      name: "",
      description: "",
      website: "",
      logo: "",
      country: "",
      order: 0,
    });
    setShowForm(true);
  };

  const openEditForm = (item: Partner) => {
    setEditingItem(item);
    setForm({
      name: item.name || "",
      description: item.description || "",
      website: item.website || "",
      logo: item.logo || "",
      country: item.country || "",
      order: item.order || 0,
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await fetch("/api/partners", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...form, order: Number(form.order) }),
        });
      } else {
        await fetch("/api/partners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, order: Number(form.order) }),
        });
      }
      setShowForm(false);
      fetchItems();
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this partner?")) return;
    try {
      await fetch(`/api/partners?id=${id}`, { method: "DELETE" });
      fetchItems();
    } catch {
      // silently fail
    }
  };

  const handleToggleActive = async (item: Partner) => {
    try {
      await fetch("/api/partners", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isActive: !item.isActive }),
      });
      fetchItems();
    } catch {
      // silently fail
    }
  };

  const filtered = search
    ? items.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.country.toLowerCase().includes(search.toLowerCase())
    )
    : items;

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading partners...</div>;
  }

  return (
    <div className="space-y-4">
      {showForm && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {editingItem ? "Edit Partner" : "Add Partner"}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-accent rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Partner name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Country</label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  placeholder="Country"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Website</label>
                <Input
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Logo URL</label>
                <Input
                  value={form.logo}
                  onChange={(e) => setForm({ ...form, logo: e.target.value })}
                  placeholder="https://...logo.png"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Order</label>
                <Input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Description</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {editingItem ? "Update Partner" : "Add Partner"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search partners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          size="sm"
          onClick={openAddForm}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Partner
        </Button>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Country</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Website</th>
                <th className="text-left p-3 font-medium">Active</th>
                <th className="text-left p-3 font-medium">Order</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyState message="No partners found." />
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {item.logo ? (
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs font-bold">
                            {item.name?.charAt(0) || "?"}
                          </div>
                        )}
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-3 hidden sm:table-cell">{item.country}</td>
                    <td className="p-3 hidden md:table-cell">
                      {item.website ? (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-xs truncate block max-w-[180px]"
                        >
                          {item.website}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleActive(item)}
                        className="inline-flex items-center gap-1"
                      >
                        {item.isActive ? (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            <Check className="w-3 h-3" /> Active
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                            Inactive
                          </Badge>
                        )}
                      </button>
                    </td>
                    <td className="p-3 text-muted-foreground">{item.order}</td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => openEditForm(item)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(item)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                        title={item.isActive ? "Deactivate" : "Activate"}
                      >
                        {item.isActive ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5 opacity-50" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 hover:bg-red-50 rounded-md transition-colors text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ━━ PRODUCTS TAB ━━
function ProductsTab() {
  const [items, setItems] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    price: "",
    comparePrice: "",
    category: "",
    stock: "0",
    isActive: true,
    isFeatured: false,
    images: "",
    features: "",
  });

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openAddForm = () => {
    setEditingItem(null);
    setForm({
      title: "",
      shortDesc: "",
      price: "",
      comparePrice: "",
      category: "",
      stock: "0",
      isActive: true,
      isFeatured: false,
      images: "",
      features: "",
    });
    setShowForm(true);
  };

  const openEditForm = (item: Product) => {
    setEditingItem(item);
    setForm({
      title: item.title || "",
      shortDesc: item.shortDesc || "",
      price: String(item.price || ""),
      comparePrice: String(item.comparePrice || ""),
      category: item.category || "",
      stock: String(item.stock || 0),
      isActive: item.isActive ?? true,
      isFeatured: item.isFeatured ?? false,
      images: item.images || "",
      features: item.features || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        price: Number(form.price) || 0,
        comparePrice: Number(form.comparePrice) || 0,
        stock: Number(form.stock) || 0,
      };
      if (editingItem) {
        await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });
      } else {
        await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setShowForm(false);
      fetchItems();
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      fetchItems();
    } catch {
      // silently fail
    }
  };

  const stockBadge = (stock: number) => {
    if (stock === 0)
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
          Out of stock
        </Badge>
      );
    if (stock <= 10)
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
          Low: {stock}
        </Badge>
      );
    return (
      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
        In stock: {stock}
      </Badge>
    );
  };

  const filtered = search
    ? items.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )
    : items;

  if (loading) {
    return <div className="text-center py-12 text-muted-foreground text-sm">Loading products...</div>;
  }

  return (
    <div className="space-y-4">
      {showForm && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {editingItem ? "Edit Product" : "Add Product"}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-accent rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Category"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Price (XAF)</label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Compare Price (XAF)
                </label>
                <Input
                  type="number"
                  value={form.comparePrice}
                  onChange={(e) =>
                    setForm({ ...form, comparePrice: e.target.value })
                  }
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Stock</label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Images URL</label>
                <Input
                  value={form.images}
                  onChange={(e) => setForm({ ...form, images: e.target.value })}
                  placeholder="Comma-separated image URLs"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Short Description
              </label>
              <Textarea
                value={form.shortDesc}
                onChange={(e) =>
                  setForm({ ...form, shortDesc: e.target.value })
                }
                placeholder="Brief product description"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Features</label>
              <Textarea
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder="Comma-separated features"
                rows={2}
              />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="rounded"
                />
                Active
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm({ ...form, isFeatured: e.target.checked })
                  }
                  className="rounded"
                />
                Featured
              </label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {editingItem ? "Update Product" : "Add Product"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          size="sm"
          onClick={openAddForm}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Product
        </Button>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">Category</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Stock</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">Featured</th>
                <th className="text-left p-3 font-medium">Active</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState message="No products found." />
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3 font-medium">{item.title}</td>
                    <td className="p-3 hidden sm:table-cell">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="p-3">
                      {item.price.toLocaleString()} XAF
                    </td>
                    <td className="p-3">{stockBadge(item.stock)}</td>
                    <td className="p-3 hidden md:table-cell">
                      {item.isFeatured ? (
                        <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                          Featured
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          No
                        </Badge>
                      )}
                    </td>
                    <td className="p-3">
                      {item.isActive ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                          Inactive
                        </Badge>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => openEditForm(item)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 hover:bg-red-50 rounded-md transition-colors text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ━━ RECEIPTS TAB ━━
interface ReceiptLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const emptyLineItem: ReceiptLineItem = { description: "", quantity: 1, unitPrice: 0, total: 0 };

function ReceiptsTab() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [printOpen, setPrintOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState<Receipt | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Receipt form state
  const [receiptForm, setReceiptForm] = useState({
    studentId: "",
    projectId: "",
    paymentMethod: "CASH",
    status: "PAID",
    notes: "",
  });
  const [lineItems, setLineItems] = useState<ReceiptLineItem[]>([
    { ...emptyLineItem },
  ]);

  const fetchReceipts = useCallback(async () => {
    try {
      const res = await fetch("/api/receipts");
      const data = await res.json();
      setReceipts(Array.isArray(data) ? data : []);
    } catch {
      setReceipts([]);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    }
  }, []);

  useEffect(() => {
    fetchReceipts();
  }, [fetchReceipts]);

  const formatPaymentMethod = (method: string) => method.replace(/_/g, " ");

  const calcSubtotal = () =>
    lineItems.reduce((sum, item) => sum + item.total, 0);

  const taxRate = 0.19; // 19% VAT
  const calcTax = () => Math.round(calcSubtotal() * taxRate);
  const calcGrandTotal = () => calcSubtotal() + calcTax();

  const updateLineItem = (index: number, field: keyof ReceiptLineItem, value: string | number) => {
    setLineItems((prev) => {
      const updated = [...prev];
      const item = { ...updated[index], [field]: value };
      if (field === "quantity" || field === "unitPrice") {
        item.total = item.quantity * item.unitPrice;
      }
      updated[index] = item;
      return updated;
    });
  };

  const addLineItem = () => {
    setLineItems((prev) => [...prev, { ...emptyLineItem }]);
  };

  const removeLineItem = (index: number) => {
    setLineItems((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setReceiptForm({
      studentId: "",
      projectId: "",
      paymentMethod: "CASH",
      status: "PAID",
      notes: "",
    });
    setLineItems([{ ...emptyLineItem }]);
    setEditingReceipt(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    // Load users/projects if not yet loaded
    if (users.length === 0) fetchUsers();
    if (projects.length === 0) fetchProjects();
  };

  const openEditForm = (r: Receipt) => {
    setEditingReceipt(r);
    setReceiptForm({
      studentId: r.studentId || "",
      projectId: r.projectId || "",
      paymentMethod: r.paymentMethod || "CASH",
      status: r.status || "PAID",
      notes: r.notes || "",
    });
    try {
      const parsed = r.items ? JSON.parse(r.items) : [];
      setLineItems(
        parsed.length > 0
          ? parsed
          : [{ ...emptyLineItem }]
      );
    } catch {
      setLineItems([{ ...emptyLineItem }]);
    }
    if (users.length === 0) fetchUsers();
    if (projects.length === 0) fetchProjects();
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!receiptForm.studentId) return;
    setFormLoading(true);
    try {
      const subtotal = calcSubtotal();
      const tax = calcTax();
      const total = calcGrandTotal();
      const validItems = lineItems.filter((i) => i.description.trim());

      if (editingReceipt) {
        await fetch("/api/receipts", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingReceipt.id,
            studentId: receiptForm.studentId,
            projectId: receiptForm.projectId || null,
            paymentMethod: receiptForm.paymentMethod,
            status: receiptForm.status,
            notes: receiptForm.notes,
            items: validItems,
            subtotal,
            tax,
            total,
          }),
        });
      } else {
        await fetch("/api/receipts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: receiptForm.studentId,
            projectId: receiptForm.projectId || null,
            paymentMethod: receiptForm.paymentMethod,
            notes: receiptForm.notes,
            items: validItems,
            subtotal,
            tax,
            total,
          }),
        });
      }
      setShowForm(false);
      fetchReceipts();
    } catch {
      // silently fail
    } finally {
      setFormLoading(false);
    }
  };

  const handlePrint = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setPrintOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Receipt Form */}
      {showForm && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                {editingReceipt ? "Edit Receipt" : "Generate Receipt"}
              </h3>
              <button onClick={() => { setShowForm(false); resetForm(); }} className="p-1 hover:bg-accent rounded-md">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Student + Project row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Student *</label>
                <select
                  value={receiptForm.studentId}
                  onChange={(e) =>
                    setReceiptForm({ ...receiptForm, studentId: e.target.value })
                  }
                  className="w-full h-9 rounded-md border bg-transparent px-3 text-sm dark:bg-input/30"
                >
                  <option value="">Select student...</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Project (optional)</label>
                <select
                  value={receiptForm.projectId}
                  onChange={(e) =>
                    setReceiptForm({ ...receiptForm, projectId: e.target.value })
                  }
                  className="w-full h-9 rounded-md border bg-transparent px-3 text-sm dark:bg-input/30"
                >
                  <option value="">No project</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Method + Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Payment Method</label>
                <select
                  value={receiptForm.paymentMethod}
                  onChange={(e) =>
                    setReceiptForm({ ...receiptForm, paymentMethod: e.target.value })
                  }
                  className="w-full h-9 rounded-md border bg-transparent px-3 text-sm dark:bg-input/30"
                >
                  <option value="CASH">Cash</option>
                  <option value="MOBILE_MONEY">Mobile Money</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Status</label>
                <select
                  value={receiptForm.status}
                  onChange={(e) =>
                    setReceiptForm({ ...receiptForm, status: e.target.value })
                  }
                  className="w-full h-9 rounded-md border bg-transparent px-3 text-sm dark:bg-input/30"
                >
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Line Items</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLineItem}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Item
                </Button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {lineItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-2 items-end"
                  >
                    <div className="col-span-12 sm:col-span-5">
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) =>
                          updateLineItem(idx, "description", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <Input
                        type="number"
                        placeholder="Qty"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateLineItem(idx, "quantity", Number(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <Input
                        type="number"
                        placeholder="Price"
                        min={0}
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateLineItem(idx, "unitPrice", Number(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-1">
                      <span className="text-sm font-mono text-muted-foreground w-full text-right">
                        {(item.quantity * item.unitPrice).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeLineItem(idx)}
                        className="p-1 hover:bg-red-50 rounded-md text-red-500 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Notes</label>
              <Textarea
                value={receiptForm.notes}
                onChange={(e) =>
                  setReceiptForm({ ...receiptForm, notes: e.target.value })
                }
                placeholder="Optional notes..."
                rows={2}
              />
            </div>

            {/* Totals */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">{calcSubtotal().toLocaleString()} XAF</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VAT (19%)</span>
                <span className="font-mono">{calcTax().toLocaleString()} XAF</span>
              </div>
              <div className="border-t pt-1 mt-1 flex justify-between text-sm font-bold">
                <span>Grand Total</span>
                <span className="text-primary font-mono text-base">
                  {calcGrandTotal().toLocaleString()} XAF
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                disabled={formLoading || !receiptForm.studentId || lineItems.every((i) => !i.description.trim())}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {formLoading
                  ? "Saving..."
                  : editingReceipt
                    ? "Update Receipt"
                    : "Generate Receipt"}
              </Button>
              <Button
                variant="outline"
                onClick={() => { setShowForm(false); resetForm(); }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{receipts.length} receipts total</p>
        <Button
          size="sm"
          onClick={openAddForm}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-1.5" /> New Receipt
        </Button>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left p-3 font-medium">Receipt #</th>
                <th className="text-left p-3 font-medium">Student</th>
                <th className="text-left p-3 font-medium">Amount</th>
                <th className="text-left p-3 font-medium hidden sm:table-cell">
                  Payment
                </th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium hidden md:table-cell">
                  Date
                </th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receipts.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState message="No receipts found." />
                  </td>
                </tr>
              ) : (
                receipts.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b hover:bg-accent/50 transition-colors"
                  >
                    <td className="p-3 font-mono text-xs">{r.receiptNo}</td>
                    <td className="p-3">{r.student?.name || r.studentId}</td>
                    <td className="p-3 font-semibold">
                      {r.total?.toLocaleString() || 0} XAF
                    </td>
                    <td className="p-3 hidden sm:table-cell">
                      <Badge variant="outline">
                        {formatPaymentMethod(r.paymentMethod)}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={r.status === "PAID" ? "default" : "secondary"}
                        className={
                          r.status === "PAID"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : r.status === "PENDING"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        }
                      >
                        {r.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => openEditForm(r)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                        title="Edit Receipt"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handlePrint(r)}
                        className="p-1.5 hover:bg-accent rounded-md transition-colors"
                        title="Print Receipt"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Print Dialog */}
      {selectedReceipt && (
        <ReceiptPrint
          receipt={{
            id: selectedReceipt.id,
            receiptNo: selectedReceipt.receiptNo,
            items:
              selectedReceipt.items ||
              JSON.stringify([
                {
                  description: "Service",
                  quantity: 1,
                  unitPrice: selectedReceipt.total || 0,
                  total: selectedReceipt.total || 0,
                },
              ]),
            subtotal: selectedReceipt.subtotal || selectedReceipt.total || 0,
            tax: selectedReceipt.tax || 0,
            total: selectedReceipt.total || 0,
            paymentMethod: formatPaymentMethod(selectedReceipt.paymentMethod),
            status: selectedReceipt.status,
            createdAt: selectedReceipt.createdAt,
            notes: selectedReceipt.notes,
            student: selectedReceipt.student,
            project: selectedReceipt.project,
          }}
          isOpen={printOpen}
          onClose={() => {
            setPrintOpen(false);
            setSelectedReceipt(null);
          }}
        />
      )}
    </div>
  );
}

// ━━ SETTINGS TAB ━━
function SettingsTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold">General Settings</h3>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Company Name</label>
            <Input defaultValue="CYBER WEB" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Tagline</label>
            <Input defaultValue="Empowering Innovation Through Technology" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Contact Email</label>
            <Input defaultValue="contact@cyberweb.cm" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
            <Input defaultValue="+237 6XX XXX XXX" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              WhatsApp Business Number
            </label>
            <Input defaultValue="654492653" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold">Social Media Links</h3>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Facebook</label>
            <Input defaultValue="https://facebook.com/cyberweb" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">LinkedIn</label>
            <Input defaultValue="https://linkedin.com/company/cyberweb" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">GitHub</label>
            <Input defaultValue="https://github.com/cyberweb" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
