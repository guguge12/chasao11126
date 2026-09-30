// 创建 Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // 检查是否是警告卡片
    if (entry.target.classList.contains('warning-card') || entry.target.classList.contains('warning-title')) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        entry.target.classList.remove('animate-out');
      } else {
        entry.target.classList.add('animate-out');
        entry.target.classList.remove('animate');
      }
    } else {
      // 获取所有在同一行的元素
      const row = entry.target.parentElement;
      const rowCards = row.querySelectorAll('.social-link');

      if (entry.isIntersecting) {
        rowCards.forEach(card => {
          card.classList.add('animate');
          card.classList.remove('animate-out');
        });
      } else {
        rowCards.forEach(card => {
          card.classList.add('animate-out');
          card.classList.remove('animate');
        });
      }
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// 获取所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.social-link');
  const warningElements = document.querySelectorAll('.warning-card, .warning-title');
  const container = document.querySelector('.container');

  // 页面加载时先显示所有元素
  setTimeout(() => {
    cards.forEach(card => {
      card.classList.add('animate');
    });
    warningElements.forEach(element => {
      element.classList.add('animate');
    });
  }, 100);

  // 然后再添加观察器
  setTimeout(() => {
    cards.forEach(card => {
      observer.observe(card);
    });
    warningElements.forEach(element => {
      observer.observe(element);
    });
  }, 1000);

  // 添加链接点击效果
  cards.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
      }
      link.style.transform = 'scale(0.95)';
      setTimeout(() => {
        link.style.transform = '';
      }, 200);
    });
  });

  // 添加页面加载动画
  container.style.opacity = '0';
  setTimeout(() => {
    container.style.transition = 'opacity 0.5s ease';
    container.style.opacity = '1';
  }, 100);
});

function toggleShareModal() {
  const modal = document.getElementById('shareModal');
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }
}

function copyLink() {
  const link = 'https://www.chashaohibiki.com/';
  navigator.clipboard.writeText(link).then(() => {
    alert('链接已复制到剪贴板！');
  }).catch(err => {
    console.error('复制失败:', err);
  });
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById('shareModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
} 