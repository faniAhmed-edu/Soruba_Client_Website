import { useState, useEffect, useCallback } from "react";
import type { FormEvent } from "react";
import { supabase } from "../lib/supabase";
import type { BlogRow } from "../lib/supabase";
import { Plus, Pencil, Trash2, X, Save, Loader as Loader2, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Search, Calendar, Tag, FileText } from "lucide-react";

type BlogFormData = {
  title: string; slug: string; date: string; category: string; excerpt: string;
  content: string; image_url: string; tags: string; author: string;
};

const emptyForm: BlogFormData = {
  title: "", slug: "",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  category: "Cyber Security", excerpt: "", content: "", image_url: "", tags: "", author: "Soruba LLC",
};

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

export default function AdminBlogManager() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<BlogRow | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (error) setActionError(error.message);
    else setBlogs((data as BlogRow[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setFormData(emptyForm); setEditingId(null); setActionError(null); setShowModal(true);
  };

  const openEditModal = (blog: BlogRow) => {
    setFormData({
      title: blog.title, slug: blog.slug, date: blog.date, category: blog.category,
      excerpt: blog.excerpt,
      content: Array.isArray(blog.content) ? blog.content.join("\n\n") : "",
      image_url: blog.image_url || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
      author: blog.author,
    });
    setEditingId(blog.id); setActionError(null); setShowModal(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setActionError(null);
    setSaving(true);
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      setActionError("Title, excerpt, and content are required."); setSaving(false); return;
    }
    const slug = formData.slug.trim() || slugify(formData.title);
    const contentArray = formData.content.split("\n\n").map((p) => p.trim()).filter(Boolean);
    const tagsArray = formData.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const payload = {
      title: formData.title.trim(), slug, date: formData.date.trim(), category: formData.category.trim(),
      excerpt: formData.excerpt.trim(), content: contentArray,
      image_url: formData.image_url.trim() || null, tags: tagsArray,
      author: formData.author.trim(), updated_at: new Date().toISOString(),
    };
    try {
      if (editingId) {
        const { error } = await supabase.from("blogs").update(payload).eq("id", editingId);
        if (error) throw error;
        setSuccessMsg("Blog post updated successfully.");
      } else {
        const { error } = await supabase.from("blogs").insert(payload);
        if (error) throw error;
        setSuccessMsg("Blog post created successfully.");
      }
      setShowModal(false);
      await fetchBlogs();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save blog post.";
      setActionError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blog: BlogRow) => {
    setActionError(null);
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", blog.id);
      if (error) throw error;
      setSuccessMsg("Blog post deleted successfully.");
      setDeleteConfirm(null);
      await fetchBlogs();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete blog post.";
      setActionError(msg);
    }
  };

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-sm font-semibold text-emerald-700 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={18} className="shrink-0" /><span>{successMsg}</span>
        </div>
      )}
      {actionError && !showModal && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-semibold text-red-600 flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0" /><span>{actionError}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, category, or slug..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 transition-colors" />
        </div>
        <button onClick={openCreateModal}
          className="flex items-center justify-center gap-2 py-2.5 px-6 bg-gradient-to-r from-navy-900 to-brand-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all whitespace-nowrap">
          <Plus size={18} /><span>New Blog Post</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Posts", value: blogs.length, icon: FileText },
          { label: "Categories", value: new Set(blogs.map((b) => b.category)).size, icon: Tag },
          { label: "Latest Post", value: blogs[0]?.date || "—", icon: Calendar },
          { label: "Showing", value: filteredBlogs.length, icon: Search },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-brand-600 shrink-0">
                <stat.icon size={18} />
              </div>
              <div className="overflow-hidden">
                <p className="text-lg font-extrabold text-navy-900 truncate">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 size={24} className="animate-spin text-brand-600" />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={40} className="text-slate-200 mx-auto mb-3" />
            <p className="text-sm font-bold text-navy-900">No blog posts found</p>
            <p className="text-xs text-slate-500 mt-1">
              {searchTerm ? "Try adjusting your search." : "Click 'New Blog Post' to create one."}
            </p>
          </div>
        ) : (
          <>
            <table className="hidden md:table w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 px-6 py-3">Title</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 px-4 py-3">Category</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 px-4 py-3">Date</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 px-4 py-3">Author</th>
                  <th className="text-right text-[10px] font-bold uppercase tracking-wider text-slate-500 px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-navy-900 line-clamp-1">{blog.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">/{blog.slug}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full whitespace-nowrap">{blog.category}</span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500 font-medium whitespace-nowrap">{blog.date}</td>
                    <td className="px-4 py-4 text-xs text-slate-500 font-medium">{blog.author}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(blog)}
                          className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-brand-600 text-brand-600 hover:text-white border border-slate-200 flex items-center justify-center transition-all" title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => setDeleteConfirm(blog)}
                          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-200 flex items-center justify-center transition-all" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="md:hidden divide-y divide-slate-100">
              {filteredBlogs.map((blog) => (
                <div key={blog.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-navy-900 line-clamp-2">{blog.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">/{blog.slug}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => openEditModal(blog)} className="w-8 h-8 rounded-lg bg-slate-50 text-brand-600 border border-slate-200 flex items-center justify-center">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteConfirm(blog)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 border border-red-200 flex items-center justify-center">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">{blog.category}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{blog.date}</span>
                    <span className="text-[10px] text-slate-500 font-medium">• {blog.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-navy-900 to-brand-700 px-6 py-5 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-white tracking-tight">{editingId ? "Edit Blog Post" : "Create New Blog Post"}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X size={22} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {actionError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 flex items-start gap-2">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" /><span>{actionError}</span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Title *</label>
                  <input type="text" value={formData.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setFormData((prev) => ({ ...prev, title: newTitle }));
                      if (!editingId) setFormData((prev) => ({ ...prev, slug: slugify(newTitle) }));
                    }}
                    required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 transition-colors"
                    placeholder="Enter blog title..." />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Slug (URL)</label>
                  <input type="text" value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-navy-900 focus:outline-none focus:border-brand-600 transition-colors"
                    placeholder="auto-generated-from-title" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Category *</label>
                  <select value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 transition-colors">
                    <option>Cyber Security</option><option>Database Security</option>
                    <option>IT Consultancy</option><option>Cloud</option>
                    <option>Compliance</option><option>Technology</option><option>Business</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Date</label>
                  <input type="text" value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 transition-colors"
                    placeholder="e.g. May 1, 2026" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Author</label>
                  <input type="text" value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 transition-colors"
                    placeholder="Author name..." />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">Excerpt *</label>
                  <textarea value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    required rows={2}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 transition-colors resize-none"
                    placeholder="Short summary of the blog post..." />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Content * <span className="text-slate-400 normal-case font-normal">(separate paragraphs with a blank line)</span>
                  </label>
                  <textarea value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required rows={8}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 transition-colors resize-y leading-relaxed"
                    placeholder="Write your blog content here. Leave a blank line between paragraphs..." />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Image URL <span className="text-slate-400 normal-case font-normal">(optional)</span>
                  </label>
                  <input type="text" value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 transition-colors"
                    placeholder="https://example.com/image.jpg" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                    Tags <span className="text-slate-400 normal-case font-normal">(comma-separated)</span>
                  </label>
                  <input type="text" value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-navy-900 focus:outline-none focus:border-brand-600 transition-colors"
                    placeholder="Technology, Security, Cloud" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button type="button" onClick={() => setShowModal(false)}
                  className="py-2.5 px-5 bg-slate-50 text-navy-900 font-bold text-sm rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="py-2.5 px-6 bg-gradient-to-r from-navy-900 to-brand-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-60">
                  {saving ? (<><Loader2 size={16} className="animate-spin" /><span>Saving...</span></>)
                          : (<><Save size={16} /><span>{editingId ? "Update Post" : "Create Post"}</span></>)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
                <Trash2 size={28} className="text-red-500" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-extrabold text-navy-900">Delete Blog Post?</h3>
                <p className="text-sm text-slate-500">
                  Are you sure you want to delete <span className="font-bold text-navy-900">"{deleteConfirm.title}"</span>?
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 bg-slate-50 text-navy-900 font-bold text-sm rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2">
                  <Trash2 size={15} /><span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
