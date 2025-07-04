import { useState, useEffect, useCallback, memo } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input'; // Assuming this is still used elsewhere or for styling
import {
  Utensils,
  ShoppingBag,
  Home,
  Plane,
  MoreHorizontal,
  Edit3,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Calendar,
  PieChart,
  Save,
  X,
  Plus,
  Trash2,
  Play
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import BubbleBackground from './BubbleBackground';
import { useCategoryProgress } from '../context/CategoryProgressContext';

const iconNameToComponent = {
  Utensils,
  ShoppingBag,
  Home,
  Plane,
  Play,
  MoreHorizontal,
  DollarSign,
  Calendar,
  TrendingUp,
  PieChart
};

const LimitBudget = () => {
  const { categories, setCategories } = useCategoryProgress();

  const [editingCategory, setEditingCategory] = useState(null);
  const [editingValues, setEditingValues] = useState({ limit: '', duration: 1 });
  const [notificationsTriggered, setNotificationsTriggered] = useState({});
  const [lastSpentAmounts, setLastSpentAmounts] = useState({});
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', limit: '', duration: 1, icon: 'Others' }); // Added icon default
  const [notificationTimeout, setNotificationTimeout] = useState({});

  // Available icons for new categories
  const availableIcons = [
    { name: 'Utensils', icon: Utensils },
    { name: 'ShoppingBag', icon: ShoppingBag },
    { name: 'Home', icon: Home },
    { name: 'Plane', icon: Plane },
    { name: 'Play', icon: Play },
    { name: 'MoreHorizontal', icon: MoreHorizontal },
    { name: 'DollarSign', icon: DollarSign },
    { name: 'Calendar', icon: Calendar },
    { name: 'TrendingUp', icon: TrendingUp },
    { name: 'PieChart', icon: PieChart }
  ];

  // Flirty Hindi notification messages
  const notificationMessages = {
    food: {
      50: "🍔 Bas yahi khate rehoge kya? Budget yaad hai? 💸",
      75: "🍕 Khaate jao, par bachat ka kya? 😋",
      100: "🍜 Aree bhukkad! Khaane pe pura paisa uda diya! 😅"
    },
    shopping: {
      50: "🛍️ Arrey fashion ke sultan! Dheere chal bhai. 👔",
      75: "💳 Card toh nahi jalega na? 🔥",
      100: "🛒 Budget ka bura haal kar diya tumne, shopaholic! 😂"
    },
    rent: {
      50: "🏠 Rent toh fixed hai, aur kuch control karo! 📊",
      75: "🏡 Room toh chhota hai, rent bada kyun lag raha? 🤔",
      100: "💰 Zyada rent bharoge toh khaoge kya, dost? 😅"
    },
    travel: {
      50: "✈️ Chalo thoda chill, lekin budget ka dhyan! 🌍",
      75: "🏖️ Ghumne chale ho Europe kya? 🗺️",
      100: "🚀 Jetsetter! Pehle budget toh dekho! 😎"
    },
    entertainment: {
      50: "🎬 Entertainment ke liye bhi budget hai! 🎭",
      75: "🎮 Gaming aur movies pe itna kyun? 🎪",
      100: "🎯 Entertainment budget bhi cross kar diya! 🎨"
    },
    others: {
      50: "📦 Thoda sambhal ke bhai! 🤝",
      75: "📋 Yeh 'others' category hi sab kuch kha gayi! 😅",
      100: "💸 Budget bhi ek cheez hoti hai, yaad hai? 🤦‍♂️"
    }
  };

  // Get notification message for any category
  const getNotificationMessage = (categoryKey, threshold) => {
    if (notificationMessages[categoryKey]) {
      return notificationMessages[categoryKey][threshold];
    }
    // Default messages for custom categories
    const defaultMessages = {
      50: "💰 50% budget use ho gaya! Dhyan do! ⚠️",
      75: "🚨 75% budget use ho gaya! Sambhal jao! ⚠️",
      100: "💸 Budget cross ho gaya! Ab kya karenge? 😅"
    };
    return defaultMessages[threshold];
  };

  // Helper to save notification to localStorage
  function saveNotificationToStorage(notification) {
    const existing = JSON.parse(localStorage.getItem('finzen_notifications') || '[]');
    localStorage.setItem('finzen_notifications', JSON.stringify([
      notification,
      ...existing
    ]));
  }

  // Check and trigger notifications
  const checkNotifications = useCallback((categoryKey, spent, limit) => {
    if (limit <= 0) return;

    const percentage = (spent / limit) * 100;
    const thresholds = [50, 75, 100];

    setLastSpentAmounts(prevLastSpent => {
      const lastSpent = prevLastSpent[categoryKey] || 0;
      setNotificationsTriggered(prevNotifications => {
        let updatedNotifications = { ...prevNotifications }; // Create a mutable copy
        thresholds.forEach(threshold => {
          const thresholdAmount = (limit * threshold) / 100;
          // For 50% and 75% thresholds - trigger only once per month
          if (threshold < 100) {
            if (spent >= thresholdAmount && lastSpent < thresholdAmount && !updatedNotifications[`${categoryKey}_${threshold}`]) {
              const message = getNotificationMessage(categoryKey, threshold);
              if (message) {
                toast.dismiss(); // Dismiss all current toasts
                toast(message, {
                  id: 'budget-notification',
                  duration: 5000,
                  position: 'top-right',
                  style: {
                    background: threshold === 75 ? '#fffbeb' : '#f0f9ff',
                    color: threshold === 75 ? '#d97706' : '#2563eb',
                    border: threshold === 75 ? '1px solid #fed7aa' : '1px solid #bfdbfe',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    padding: '12px 16px',
                    marginTop: '80px',
                    marginRight: '20px',
                  },
                  icon: threshold === 75 ? '⚠️' : '💡',
                });
                updatedNotifications = {
                  ...updatedNotifications,
                  [`${categoryKey}_${threshold}`]: true
                };
                saveNotificationToStorage({
                  title: `Overspending Alert: ${categories[categoryKey]?.name || categoryKey}`,
                  category: categories[categoryKey]?.name || categoryKey,
                  amountExceeded: spent > limit ? spent - limit : undefined,
                  spent,
                  limit,
                  timestamp: new Date().toISOString(),
                  read: false,
                  message,
                  threshold,
                });
              }
            }
          }
          // For 100% threshold - trigger every time it's crossed
          else if (threshold === 100) {
            if (spent >= thresholdAmount && lastSpent < thresholdAmount) {
              const message = getNotificationMessage(categoryKey, threshold);
              if (message) {
                toast.dismiss(); // Dismiss all current toasts
                toast(message, {
                  id: 'budget-notification',
                  duration: 5000,
                  position: 'top-right',
                  style: {
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    padding: '12px 16px',
                    marginTop: '80px',
                    marginRight: '20px',
                  },
                  icon: '🚨',
                });
                saveNotificationToStorage({
                  title: `Overspending Alert: ${categories[categoryKey]?.name || categoryKey}`,
                  category: categories[categoryKey]?.name || categoryKey,
                  amountExceeded: spent > limit ? spent - limit : undefined,
                  spent,
                  limit,
                  timestamp: new Date().toISOString(),
                  read: false,
                  message,
                  threshold,
                });
              }
            }
          }
        });
        return updatedNotifications; // Return the potentially updated state
      });
      return {
        ...prevLastSpent,
        [categoryKey]: spent
      };
    });
  }, [getNotificationMessage]); // Added getNotificationMessage to dependencies

  // Update spent amount for a category
  const updateSpent = (categoryKey, amount) => {
    setCategories(prev => {
      const newCategories = {
        ...prev,
        [categoryKey]: {
          ...prev[categoryKey],
          spent: Math.max(0, prev[categoryKey].spent + amount)
        }
      };

      // Check notifications after update
      const newSpent = newCategories[categoryKey].spent;
      const limit = newCategories[categoryKey].limit;

      // Clear any existing timeout for this category
      if (notificationTimeout[categoryKey]) {
        clearTimeout(notificationTimeout[categoryKey]);
      }

      // Set a new timeout to prevent rapid successive calls
      const timeoutId = setTimeout(() => {
        checkNotifications(categoryKey, newSpent, limit);
      }, 100);

      setNotificationTimeout(prev => ({
        ...prev,
        [categoryKey]: timeoutId
      }));

      return newCategories;
    });
  };

  // Start editing a category
  const startEditing = (categoryKey) => {
    const category = categories[categoryKey];
    setEditingValues({
      limit: category.limit.toString(),
      duration: category.duration
    });
    setEditingCategory(categoryKey);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingCategory(null);
    setEditingValues({ limit: '', duration: 1 });
  };

  // Save category changes
  const saveCategory = (categoryKey) => {
    const newLimit = parseFloat(editingValues.limit);
    const newDuration = parseInt(editingValues.duration);

    if (isNaN(newLimit) || newLimit < 0) {
      toast.error('Please enter a valid limit amount');
      return;
    }

    if (isNaN(newDuration) || newDuration < 1 || newDuration > 12) {
      toast.error('Please select a valid duration (1-12 months)');
      return;
    }

    setCategories(prev => ({
      ...prev,
      [categoryKey]: {
        ...prev[categoryKey],
        limit: newLimit,
        duration: newDuration
      }
    }));

    setEditingCategory(null);
    setEditingValues({ limit: '', duration: 1 });
    toast.success(`${categories[categoryKey].name} budget updated successfully!`);
  };

  // Delete a category
  const deleteCategory = (categoryKey) => {
    if (Object.keys(categories).length <= 1) {
      toast.error('Cannot delete the last category');
      return;
    }

    const categoryName = categories[categoryKey].name;
    setCategories(prev => {
      const newCategories = { ...prev };
      delete newCategories[categoryKey];
      return newCategories;
    });

    // Clean up notifications for deleted category
    setNotificationsTriggered(prev => {
      const newNotifications = { ...prev };
      Object.keys(newNotifications).forEach(key => {
        if (key.startsWith(`${categoryKey}_`)) {
          delete newNotifications[key];
        }
      });
      return newNotifications;
    });

    toast.success(`${categoryName} category deleted successfully!`);
  };

  // Add new category
  const addCategory = () => {
    const { name, limit, duration, icon } = newCategory;

    if (!name.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    if (isNaN(parseFloat(limit)) || parseFloat(limit) < 0) {
      toast.error('Please enter a valid limit amount');
      return;
    }

    const categoryKey = name.toLowerCase().replace(/\s+/g, '_');

    if (categories[categoryKey]) {
      toast.error('Category already exists');
      return;
    }

    const selectedIcon = availableIcons.find(i => i.name === icon)?.name || 'MoreHorizontal';

    setCategories(prev => ({
      ...prev,
      [categoryKey]: {
        limit: parseFloat(limit),
        spent: 0,
        duration: parseInt(duration),
        name: name.trim(),
        icon: selectedIcon
      }
    }));

    setNewCategory({ name: '', limit: '', duration: 1, icon: 'Others' });
    setShowAddCategory(false);
    toast.success(`${name} category added successfully!`);
  };

  // Reset notifications for new month
  useEffect(() => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${now.getMonth()}`;

    if (localStorage.getItem('lastNotificationReset') !== monthKey) {
      setNotificationsTriggered({});
      setLastSpentAmounts({});
      localStorage.setItem('lastNotificationReset', monthKey);
    }
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(notificationTimeout).forEach(timeoutId => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      });
    };
  }, [notificationTimeout]);

  // Load categories from localStorage on mount (robust)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('finzen_categories');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          Object.values(parsed).every(cat =>
            cat && typeof cat.limit === 'number' && typeof cat.spent === 'number' && typeof cat.duration === 'number' && typeof cat.name === 'string' && cat.icon
          )
        ) {
          setCategories(parsed);
          return;
        }
      }
    } catch (e) {
      // Ignore and fallback
    }
    setCategories(defaultCategories);
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('finzen_categories', JSON.stringify(categories));
  }, [categories]);

  const CategoryCard = memo(({ categoryKey, data }) => { // Wrapped with memo
    const IconComponent = iconNameToComponent[data.icon] || MoreHorizontal;
    const percentage = data.limit > 0 ? (data.spent / data.limit) * 100 : 0;
    const isEditing = editingCategory === categoryKey;

    const getProgressColor = (percent) => {
      if (percent >= 100) return 'bg-red-500';
      if (percent >= 75) return 'bg-orange-500';
      if (percent >= 50) return 'bg-yellow-500';
      return 'bg-green-500';
    };

    return (
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#1db954] to-[#1e90ff] rounded-lg">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {data.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {data.duration} month{data.duration > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          {!isEditing && (
            <div className="flex gap-1">
              <button
                onClick={() => startEditing(categoryKey)}
                className="p-2 text-gray-400 hover:text-[#1db954] transition-colors"
                title="Edit budget"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteCategory(categoryKey)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Monthly Limit (₹)
              </label>
              <input
                min="1000"
                step="100" 
                type="number"
                value={editingValues.limit}
                onChange={e => setEditingValues(() => ({ limit: e.target.value }))}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] bg-white/90 dark:bg-gray-800/90 text-white placeholder-gray-300 w-full"
                placeholder="e.g. 5000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Duration (months)
              </label>
              <select
                value={editingValues.duration}
                onChange={(e) => setEditingValues(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:border-transparent"
              >
                <option value={1}>1 month</option>
                <option value={2}>2 months</option>
                <option value={3}>3 months</option>
                <option value={6}>6 months</option>
                <option value={12}>12 months</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => saveCategory(categoryKey)}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-lg py-3"
              >
                <Save className="w-6 h-6" />
                <span>Save</span>
              </Button>
              <Button
                onClick={cancelEditing}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-lg py-3"
              >
                <X className="w-6 h-6" />
                <span>Cancel</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Spent</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  ₹{data.spent.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Limit</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  ₹{data.limit.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className={`font-medium ${
                  percentage >= 100 ? 'text-red-600' :
                    percentage >= 75 ? 'text-orange-600' :
                      percentage >= 50 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                  {percentage.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => updateSpent(categoryKey, 500)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                +₹500
              </Button>
              <Button
                onClick={() => updateSpent(categoryKey, -500)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                -₹500
              </Button>
            </div>
          </div>
        )}
      </Card>
    );
  });

  const AddCategoryCard = () => {
    if (!showAddCategory) {
      return (
        <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
            <div className="p-3 bg-gradient-to-r from-[#1db954] to-[#1e90ff] rounded-lg mb-4">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Add New Category
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Create a custom budget category
            </p>
            <Button
              onClick={() => setShowAddCategory(true)}
              className="flex items-center justify-center w-[50%] bg-gradient-to-r from-[#1db954] to-[#1e90ff] hover:from-[#1db954]/80 hover:to-[#1e90ff]/80 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Add New Category
          </h3>
          <button
            onClick={() => setShowAddCategory(false)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter category name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Limit (₹)
            </label>
            <input
              type="text"
              value={newCategory.limit}
              onChange={e => setNewCategory(prev => ({ ...prev, limit: e.target.value }))}
              placeholder="e.g. 5000"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#1db954] bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-white placeholder-gray-400 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duration (months)
            </label>
            <select
              value={newCategory.duration}
              onChange={(e) => setNewCategory(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:border-transparent"
            >
              <option value={1}>1 month</option>
              <option value={2}>2 months</option>
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={12}>12 months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Icon
            </label>
            <select
              value={newCategory.icon}
              onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1db954] focus:border-transparent"
            >
              {availableIcons.map((iconOption) => (
                <option key={iconOption.name} value={iconOption.name}>
                  {iconOption.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={addCategory}
              className="flex items-center justify-center w-[50%] bg-green-500 hover:bg-green-600 text-white"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Category
            </Button>
            <Button
              onClick={() => setShowAddCategory(false)}
              className="flex items-center justify-center w-[50%] bg-red-500 hover:bg-red-600 text-white"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 pt-24 px-6 pb-8 sm:px-8 md:px-12 relative">
      <Toaster position="top-right" toastOptions={{ duration: 4500 }} containerStyle={{ marginTop: '4.5rem' }} />
      <BubbleBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1db954] to-[#1e90ff] text-transparent bg-clip-text mb-6">
            Set Your Budget Limits – Aur Kharche Pe Control Pao 💸
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Apne har category ke liye budget set karo, track karo, aur smart notifications ke saath control mein raho!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <DollarSign className="w-8 h-8 text-[#1db954]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              ₹{Object.values(categories).reduce((sum, cat) => sum + cat.limit, 0).toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Total Budget</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-8 h-8 text-[#1e90ff]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              ₹{Object.values(categories).reduce((sum, cat) => sum + cat.spent, 0).toLocaleString()}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Total Spent</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <PieChart className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {Object.values(categories).reduce((sum, cat) => sum + cat.limit, 0) > 0
                ? ((Object.values(categories).reduce((sum, cat) => sum + cat.spent, 0) /
                  Object.values(categories).reduce((sum, cat) => sum + cat.limit, 0)) * 100).toFixed(1)
                : 0}%
            </h3>
            <p className="text-gray-600 dark:text-gray-400">Overall Usage</p>
          </Card>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categories).map(([key, data]) => (
            <CategoryCard key={key} categoryKey={key} data={data} />
          ))}
          <AddCategoryCard />
        </div>

        {/* Tips Section */}
        <Card className="mt-12 p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-[#1db954]" />
            Smart Budgeting Tips
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">🎯 Realistic Limits</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Apne spending pattern ke hisab se realistic limits set karo. Zyada ambitious mat bano!
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">📊 Regular Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Roz ya weekly basis pe apne expenses track karo. Awareness hi control ka pehla step hai!
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">💡 Smart Notifications</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hamare flirty notifications ko seriously lena, lekin apne budget ko aur bhi seriously! 😄
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LimitBudget;