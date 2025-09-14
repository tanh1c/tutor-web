import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Tab,
  Tabs,
  Avatar,
  Button,
  Paper,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Forum,
  Group,
  EmojiEvents,
  TrendingUp,
  Favorite,
  Comment,
  Share,
  Search,
  Add
} from '@mui/icons-material';

const Community = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
          py: 4
        }}
      >
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: 'white', mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          Cộng Đồng Học Tập
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Forum sx={{ fontSize: 40, color: '#1e40af', mb: 1 }} />
                <Typography variant="h6">1,234</Typography>
                <Typography variant="body2" color="text.secondary">Bài viết</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Group sx={{ fontSize: 40, color: '#1e40af', mb: 1 }} />
                <Typography variant="h6">567</Typography>
                <Typography variant="body2" color="text.secondary">Thành viên</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <EmojiEvents sx={{ fontSize: 40, color: '#FFD700', mb: 1 }} />
                <Typography variant="h6">89</Typography>
                <Typography variant="body2" color="text.secondary">Câu chuyện thành công</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUp sx={{ fontSize: 40, color: '#10B981', mb: 1 }} />
                <Typography variant="h6">98%</Typography>
                <Typography variant="body2" color="text.secondary">Tỷ lệ hài lòng</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold'
              }
            }}
          >
            <Tab icon={<Forum />} label="Diễn Đàn" />
            <Tab icon={<Group />} label="Nhóm Học Tập" />
            <Tab icon={<EmojiEvents />} label="Thành Công" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>Diễn Đàn Thảo Luận</Typography>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">Minh Tuấn</Typography>
                        <Typography variant="body2" color="text.secondary">2 giờ trước</Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Cách tìm gia sư Toán hiệu quả cho lớp 10?
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Mình đang cần tìm gia sư Toán cho em, ai có kinh nghiệm chia sẻ với mình...
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip label="Toán học" size="small" />
                      <Chip label="Lớp 10" size="small" />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button startIcon={<Favorite />} size="small">24</Button>
                      <Button startIcon={<Comment />} size="small">8</Button>
                      <Button startIcon={<Share />} size="small">Chia sẻ</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            )}
            {tabValue === 1 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>Nhóm Học Tập</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ mr: 2, width: 60, height: 60 }} />
                          <Box>
                            <Typography variant="h6">Nhóm Ôn Thi Đại Học 2024</Typography>
                            <Typography variant="body2" color="text.secondary">
                              156 thành viên • Tổng hợp
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          Cùng nhau ôn tập và chia sẻ kiến thức cho kỳ thi đại học
                        </Typography>
                        <Button variant="contained" fullWidth>Tham gia nhóm</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
            {tabValue === 2 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>Câu Chuyện Thành Công</Typography>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <EmojiEvents sx={{ color: '#FFD700', mr: 1 }} />
                      <Typography variant="h6" color="primary">
                        Tăng từ 6.5 lên 8.5 điểm Toán
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      Học sinh: Nguyễn Văn A
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Sau 3 tháng học với thầy Minh, em đã cải thiện đáng kể điểm số...
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Gia sư: Thầy Minh Đức • Toán học
                      </Typography>
                      <Button size="small">Xem chi tiết</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
    </Layout>
  );
};

export default Community;