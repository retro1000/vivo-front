import React, { useState } from "react";
import { Tabs, Tab, Box, CircularProgress } from "@mui/material";
import { ProductGrid } from "app/components";
import { useEffect } from "react";
import { useAxios } from "app/hooks/useAxios";
import { themeColors } from "app/components/MatxTheme/themeColors";
import TodaysDeals from "./TodaysDeals";

const product = {
  new: {
    values: [
      {
        id: 1,
        name: "Dummy Paint",
        price: "$360",
        rating: 4.5,
        reviews: 95,
        imgs: ['https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316809652_205840441831581_6063038031546258878_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGAXb_2AebXn2TMzPCu7fcgg-DpxVWTMEmD4OnFVZMwSetg3Ccz6IoXXBV_m5-7sGIwfMuPl8BqehlKxq4e2RWu&_nc_ohc=B0ggwEGrDeYQ7kNvgEXYxag&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=AFnM6Zhn84iriQAdvwfxSAK&oh=00_AYB5s9jCOFaJrJ7-7vazEOvNv9mKBX6ZTKzmPaBsgSh_-g&oe=67590FE4', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/317079065_205840545164904_2299339823205142298_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG7s0uvr7Uf3uc2RU-wPp_4jlmJEzfT3lOOWYkTN9PeU9oF-J6zWXawmuUdMnDr1hVf4jQPckYYNRGeiD-Rm0AW&_nc_ohc=ZVn6l_OOzcgQ7kNvgEwy6pQ&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=ANXzE2ugbke75qDxJMHzReH&oh=00_AYAncH1nhlpizloJTBiCk4yH1oE_I_DJt5uNY2H-Pa43tQ&oe=67590C2F', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316951045_205840495164909_8345064233952031565_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH-CVZrOoj4XzBFwEkniBWDoEjpy5l1wiWgSOnLmXXCJeYVpqtSA-28FpafslseQyNt20c-XndwNfc5bi9nArR7&_nc_ohc=l2nU-LyVYfMQ7kNvgHWZglK&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A4c55aQLis-XP7F-ndY8aAb&oh=00_AYA-Fp5eG02WW_VHN-eghFObvWW-jeaY91561xG9geHpow&oe=675915B0', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316959950_205840451831580_7227902396481251709_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEn8q2_h-YqxxxUIuWYmYVrlnAtDtR4HcKWcC0O1HgdwjmvYzJF7bXE2Tj_Qox11CDt3BLd4opkL8msjGJ0ZBOj&_nc_ohc=TyzrmUrSKYoQ7kNvgHbcqX3&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A5eu_RLRZe4iQTkieyj-bwF&oh=00_AYCXSgK5YbqJ6ZE7hQuZTDTvNgU9hvbR_QpO0pZ_A7cXrA&oe=675914AF', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/317084755_205840505164908_5362232490221749378_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH3hwQjS8huf7K5y4eh_E3z5TrV5UGEv0DlOtXlQYS_QHmqxqsT6Fqwj1cHraSs-SNAKY9ntc53taiMoOjRxZmW&_nc_ohc=vXXm_PsZxcUQ7kNvgHtQCZJ&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A5UlGeZJbYM3gBmTzo7dDq6&oh=00_AYB7BjhR513SILmSeVwxd-ejzkF0WLahTCVowpCtANudPA&oe=67590F68'],
        wishList: true
      },
      {
        id: 2,
        name: "Dummy Paint",
        price: "$700",
        rating: 4.8,
        reviews: 325,
        imgs: ['https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288710953_175349728213986_5909586314590188913_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHkm1zN0neGzrTTbOViyzRObFppJaY45aZsWmklpjjlptTazpaJSWN2601Yt37b-SLr4bpg5pYdzEeEwkhrW_lC&_nc_ohc=15Wx0LpCJgwQ7kNvgE8KfIi&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A-yvgNA3mcxjPmLAU6fJh3Z&oh=00_AYAsc-_sxQJDzlzagsYWbn9qO46xujR0NM87FE2hj5VzIg&oe=67590024', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288734183_175349638213995_1958045608063445439_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGyFfrzCCYA4LFny3xGRv4A5GOc_hlyI0zkY5z-GXIjTPukE202DAuDMR_XXSLyIwUfmrwdBeb6s9DmhtCGVTy4&_nc_ohc=IGfg6hX5oBIQ7kNvgGhIioP&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A4wsjV2S5mm_fMeNNnkMmG9&oh=00_AYDZMpYBJ2VJ1FtZNVuTZs8g1K0LfswXoKinirqtrU0xcQ&oe=6758E5E0', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288845037_175349751547317_5254387529075225888_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEe0dRasnayYsyyCFITfr6r2xnbOCVElvTbGds4JUSW9AclGGM3q2BGiVhjCYV9wRqOEd8k_4NOih95q4bbsPKv&_nc_ohc=pvr0frurb5UQ7kNvgHcBd6B&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A9wsUdSjZxqZbGY3P-gAa92&oh=00_AYBy7pLD31bwzxIF_FSW9fWdQSLlZn49MxPvzQ9_rfAd2g&oe=67590D3E', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288859994_175349611547331_1652431214493675204_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGUSj8TzkuGhEHsYbi9yHBeMDjs6kXRJ6cwOOzqRdEnp_N01ULj17WtpVt9tFsu9730tn02rdfTbRHeNHVXXTP9&_nc_ohc=I0gz-fCQ9U0Q7kNvgEFEMdm&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A32TLCh-ZSVUbOdsyVF5P2u&oh=00_AYCMDpRjgCIt9N3nqtA3nTi6Sxww-Re2Fi9_iddeTULIRw&oe=67590F64', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288710953_175349728213986_5909586314590188913_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHkm1zN0neGzrTTbOViyzRObFppJaY45aZsWmklpjjlptTazpaJSWN2601Yt37b-SLr4bpg5pYdzEeEwkhrW_lC&_nc_ohc=15Wx0LpCJgwQ7kNvgE8KfIi&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A-yvgNA3mcxjPmLAU6fJh3Z&oh=00_AYAsc-_sxQJDzlzagsYWbn9qO46xujR0NM87FE2hj5VzIg&oe=67590024'],
        wishList: false

      },
      {
        id: 3,
        name: "Dummy Paint Dummy Paint Dummy Paint Dummy Paint",
        price: "LKR 5990.00",
        rating: 4.7,
        reviews: 145,
        imgs: ['https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01zSbjFM1UxWGnpFCTq_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN018rtxqF1Bs2punxc8R_0-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01zSbjFM1UxWGnpFCTq_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01ZcjbMx1UxWGi1vlsb_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01yiHly81UxWGdJrkQy_3918402584-0-cib.jpg'],
        wishList: true,
        isNew: true,
        realPrice: 'LKR 6990.00'

      },
    ],
    offset: 0,
    total: 1,
  },
  offer: {
    values: [
      {
        id: 1,
        name: "Dummy Paint",
        price: "$360",
        rating: 4.5,
        reviews: 95,
        imgs: ['https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316809652_205840441831581_6063038031546258878_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGAXb_2AebXn2TMzPCu7fcgg-DpxVWTMEmD4OnFVZMwSetg3Ccz6IoXXBV_m5-7sGIwfMuPl8BqehlKxq4e2RWu&_nc_ohc=B0ggwEGrDeYQ7kNvgEXYxag&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=AFnM6Zhn84iriQAdvwfxSAK&oh=00_AYB5s9jCOFaJrJ7-7vazEOvNv9mKBX6ZTKzmPaBsgSh_-g&oe=67590FE4', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/317079065_205840545164904_2299339823205142298_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG7s0uvr7Uf3uc2RU-wPp_4jlmJEzfT3lOOWYkTN9PeU9oF-J6zWXawmuUdMnDr1hVf4jQPckYYNRGeiD-Rm0AW&_nc_ohc=ZVn6l_OOzcgQ7kNvgEwy6pQ&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=ANXzE2ugbke75qDxJMHzReH&oh=00_AYAncH1nhlpizloJTBiCk4yH1oE_I_DJt5uNY2H-Pa43tQ&oe=67590C2F', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316951045_205840495164909_8345064233952031565_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH-CVZrOoj4XzBFwEkniBWDoEjpy5l1wiWgSOnLmXXCJeYVpqtSA-28FpafslseQyNt20c-XndwNfc5bi9nArR7&_nc_ohc=l2nU-LyVYfMQ7kNvgHWZglK&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A4c55aQLis-XP7F-ndY8aAb&oh=00_AYA-Fp5eG02WW_VHN-eghFObvWW-jeaY91561xG9geHpow&oe=675915B0', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316959950_205840451831580_7227902396481251709_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEn8q2_h-YqxxxUIuWYmYVrlnAtDtR4HcKWcC0O1HgdwjmvYzJF7bXE2Tj_Qox11CDt3BLd4opkL8msjGJ0ZBOj&_nc_ohc=TyzrmUrSKYoQ7kNvgHbcqX3&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A5eu_RLRZe4iQTkieyj-bwF&oh=00_AYCXSgK5YbqJ6ZE7hQuZTDTvNgU9hvbR_QpO0pZ_A7cXrA&oe=675914AF', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/317084755_205840505164908_5362232490221749378_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH3hwQjS8huf7K5y4eh_E3z5TrV5UGEv0DlOtXlQYS_QHmqxqsT6Fqwj1cHraSs-SNAKY9ntc53taiMoOjRxZmW&_nc_ohc=vXXm_PsZxcUQ7kNvgHtQCZJ&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A5UlGeZJbYM3gBmTzo7dDq6&oh=00_AYB7BjhR513SILmSeVwxd-ejzkF0WLahTCVowpCtANudPA&oe=67590F68'],
        wishList: true
      },
      {
        id: 2,
        name: "Dummy Paint",
        price: "$700",
        rating: 4.8,
        reviews: 325,
        imgs: ['https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288710953_175349728213986_5909586314590188913_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHkm1zN0neGzrTTbOViyzRObFppJaY45aZsWmklpjjlptTazpaJSWN2601Yt37b-SLr4bpg5pYdzEeEwkhrW_lC&_nc_ohc=15Wx0LpCJgwQ7kNvgE8KfIi&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A-yvgNA3mcxjPmLAU6fJh3Z&oh=00_AYAsc-_sxQJDzlzagsYWbn9qO46xujR0NM87FE2hj5VzIg&oe=67590024', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288734183_175349638213995_1958045608063445439_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGyFfrzCCYA4LFny3xGRv4A5GOc_hlyI0zkY5z-GXIjTPukE202DAuDMR_XXSLyIwUfmrwdBeb6s9DmhtCGVTy4&_nc_ohc=IGfg6hX5oBIQ7kNvgGhIioP&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A4wsjV2S5mm_fMeNNnkMmG9&oh=00_AYDZMpYBJ2VJ1FtZNVuTZs8g1K0LfswXoKinirqtrU0xcQ&oe=6758E5E0', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288845037_175349751547317_5254387529075225888_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEe0dRasnayYsyyCFITfr6r2xnbOCVElvTbGds4JUSW9AclGGM3q2BGiVhjCYV9wRqOEd8k_4NOih95q4bbsPKv&_nc_ohc=pvr0frurb5UQ7kNvgHcBd6B&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A9wsUdSjZxqZbGY3P-gAa92&oh=00_AYBy7pLD31bwzxIF_FSW9fWdQSLlZn49MxPvzQ9_rfAd2g&oe=67590D3E', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288859994_175349611547331_1652431214493675204_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGUSj8TzkuGhEHsYbi9yHBeMDjs6kXRJ6cwOOzqRdEnp_N01ULj17WtpVt9tFsu9730tn02rdfTbRHeNHVXXTP9&_nc_ohc=I0gz-fCQ9U0Q7kNvgEFEMdm&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A32TLCh-ZSVUbOdsyVF5P2u&oh=00_AYCMDpRjgCIt9N3nqtA3nTi6Sxww-Re2Fi9_iddeTULIRw&oe=67590F64', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288710953_175349728213986_5909586314590188913_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHkm1zN0neGzrTTbOViyzRObFppJaY45aZsWmklpjjlptTazpaJSWN2601Yt37b-SLr4bpg5pYdzEeEwkhrW_lC&_nc_ohc=15Wx0LpCJgwQ7kNvgE8KfIi&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A-yvgNA3mcxjPmLAU6fJh3Z&oh=00_AYAsc-_sxQJDzlzagsYWbn9qO46xujR0NM87FE2hj5VzIg&oe=67590024'],
        wishList: false

      },
      {
        id: 3,
        name: "Dummy Paint Dummy Paint Dummy Paint Dummy Paint",
        price: "LKR 5990.00",
        rating: 4.7,
        reviews: 145,
        imgs: ['https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01zSbjFM1UxWGnpFCTq_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN018rtxqF1Bs2punxc8R_0-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01zSbjFM1UxWGnpFCTq_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01ZcjbMx1UxWGi1vlsb_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01yiHly81UxWGdJrkQy_3918402584-0-cib.jpg'],
        wishList: true,
        isNew: true,
        realPrice: 'LKR 6990.00'

      },
    ],
    offset: 0,
    total: 1,
  },
  edits: {
    values: [
      {
        id: 1,
        name: "Dummy Paint",
        price: "$360",
        rating: 4.5,
        reviews: 95,
        imgs: ['https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316809652_205840441831581_6063038031546258878_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGAXb_2AebXn2TMzPCu7fcgg-DpxVWTMEmD4OnFVZMwSetg3Ccz6IoXXBV_m5-7sGIwfMuPl8BqehlKxq4e2RWu&_nc_ohc=B0ggwEGrDeYQ7kNvgEXYxag&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=AFnM6Zhn84iriQAdvwfxSAK&oh=00_AYB5s9jCOFaJrJ7-7vazEOvNv9mKBX6ZTKzmPaBsgSh_-g&oe=67590FE4', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/317079065_205840545164904_2299339823205142298_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG7s0uvr7Uf3uc2RU-wPp_4jlmJEzfT3lOOWYkTN9PeU9oF-J6zWXawmuUdMnDr1hVf4jQPckYYNRGeiD-Rm0AW&_nc_ohc=ZVn6l_OOzcgQ7kNvgEwy6pQ&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=ANXzE2ugbke75qDxJMHzReH&oh=00_AYAncH1nhlpizloJTBiCk4yH1oE_I_DJt5uNY2H-Pa43tQ&oe=67590C2F', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316951045_205840495164909_8345064233952031565_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH-CVZrOoj4XzBFwEkniBWDoEjpy5l1wiWgSOnLmXXCJeYVpqtSA-28FpafslseQyNt20c-XndwNfc5bi9nArR7&_nc_ohc=l2nU-LyVYfMQ7kNvgHWZglK&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A4c55aQLis-XP7F-ndY8aAb&oh=00_AYA-Fp5eG02WW_VHN-eghFObvWW-jeaY91561xG9geHpow&oe=675915B0', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/316959950_205840451831580_7227902396481251709_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEn8q2_h-YqxxxUIuWYmYVrlnAtDtR4HcKWcC0O1HgdwjmvYzJF7bXE2Tj_Qox11CDt3BLd4opkL8msjGJ0ZBOj&_nc_ohc=TyzrmUrSKYoQ7kNvgHbcqX3&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A5eu_RLRZe4iQTkieyj-bwF&oh=00_AYCXSgK5YbqJ6ZE7hQuZTDTvNgU9hvbR_QpO0pZ_A7cXrA&oe=675914AF', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/317084755_205840505164908_5362232490221749378_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH3hwQjS8huf7K5y4eh_E3z5TrV5UGEv0DlOtXlQYS_QHmqxqsT6Fqwj1cHraSs-SNAKY9ntc53taiMoOjRxZmW&_nc_ohc=vXXm_PsZxcUQ7kNvgHtQCZJ&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A5UlGeZJbYM3gBmTzo7dDq6&oh=00_AYB7BjhR513SILmSeVwxd-ejzkF0WLahTCVowpCtANudPA&oe=67590F68'],
        wishList: true
      },
      {
        id: 2,
        name: "Dummy Paint",
        price: "$700",
        rating: 4.8,
        reviews: 325,
        imgs: ['https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288710953_175349728213986_5909586314590188913_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHkm1zN0neGzrTTbOViyzRObFppJaY45aZsWmklpjjlptTazpaJSWN2601Yt37b-SLr4bpg5pYdzEeEwkhrW_lC&_nc_ohc=15Wx0LpCJgwQ7kNvgE8KfIi&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A-yvgNA3mcxjPmLAU6fJh3Z&oh=00_AYAsc-_sxQJDzlzagsYWbn9qO46xujR0NM87FE2hj5VzIg&oe=67590024', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288734183_175349638213995_1958045608063445439_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGyFfrzCCYA4LFny3xGRv4A5GOc_hlyI0zkY5z-GXIjTPukE202DAuDMR_XXSLyIwUfmrwdBeb6s9DmhtCGVTy4&_nc_ohc=IGfg6hX5oBIQ7kNvgGhIioP&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A4wsjV2S5mm_fMeNNnkMmG9&oh=00_AYDZMpYBJ2VJ1FtZNVuTZs8g1K0LfswXoKinirqtrU0xcQ&oe=6758E5E0', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288845037_175349751547317_5254387529075225888_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEe0dRasnayYsyyCFITfr6r2xnbOCVElvTbGds4JUSW9AclGGM3q2BGiVhjCYV9wRqOEd8k_4NOih95q4bbsPKv&_nc_ohc=pvr0frurb5UQ7kNvgHcBd6B&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A9wsUdSjZxqZbGY3P-gAa92&oh=00_AYBy7pLD31bwzxIF_FSW9fWdQSLlZn49MxPvzQ9_rfAd2g&oe=67590D3E', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288859994_175349611547331_1652431214493675204_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGUSj8TzkuGhEHsYbi9yHBeMDjs6kXRJ6cwOOzqRdEnp_N01ULj17WtpVt9tFsu9730tn02rdfTbRHeNHVXXTP9&_nc_ohc=I0gz-fCQ9U0Q7kNvgEFEMdm&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A32TLCh-ZSVUbOdsyVF5P2u&oh=00_AYCMDpRjgCIt9N3nqtA3nTi6Sxww-Re2Fi9_iddeTULIRw&oe=67590F64', 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288710953_175349728213986_5909586314590188913_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHkm1zN0neGzrTTbOViyzRObFppJaY45aZsWmklpjjlptTazpaJSWN2601Yt37b-SLr4bpg5pYdzEeEwkhrW_lC&_nc_ohc=15Wx0LpCJgwQ7kNvgE8KfIi&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A-yvgNA3mcxjPmLAU6fJh3Z&oh=00_AYAsc-_sxQJDzlzagsYWbn9qO46xujR0NM87FE2hj5VzIg&oe=67590024'],
        wishList: false

      },
      {
        id: 3,
        name: "Dummy Paint Dummy Paint Dummy Paint Dummy Paint",
        price: "LKR 5990.00",
        rating: 4.7,
        reviews: 145,
        imgs: ['https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01zSbjFM1UxWGnpFCTq_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN018rtxqF1Bs2punxc8R_0-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01zSbjFM1UxWGnpFCTq_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01ZcjbMx1UxWGi1vlsb_3918402584-0-cib.jpg', 'https://www.cucoo.lk/wp-content/uploads/2023/10/O1CN01yiHly81UxWGdJrkQy_3918402584-0-cib.jpg'],
        wishList: true,
        isNew: true,
        realPrice: 'LKR 6990.00'

      },
    ],
    offset: 0,
    total: 1,
  },
};

export default function ProductGallery() {
  const [selectedTab, setSelectedTab] = useState(0);

  const [products, setProducts] = useState(product);

  const [loading, setLoading] = useState(false);

  const { apiNonAuth } = useAxios();

  const convertTabKey = (index) => {
    switch (index) {
      case 0:
        return "deals";
      case 1:
        return "new";
      case 2:
        return "edits";
      default:
        return null;
    }
  };

  useEffect(() => {
    const key = convertTabKey(selectedTab);

    const getProducts = async () => {
      setLoading(true)
      await apiNonAuth
        .get(
          `/products?action=home_tabs_filter&value=${key}&offset=${products[key]?.offset}`,
          { customData: { silentError: true } }
        )
        .then((response) => {
          if (response.status === 200 && response.data) {
            setProducts((prevState) => ({
              ...prevState,
              [key]: {
                values: [...prevState[key]?.values, response.data.values],
                offset: prevState[key]?.offset + 1,
                total: response.data.total,
              },
            }));
          }
        })
        .catch((error) => { })
        .finally(() => {
          setLoading(false)
        });
    };

    (!products[key] || products[key]?.offset < products[key]?.total) &&
      getProducts();
  }, [selectedTab]);

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        centered
        sx={{
          "& .MuiTabs-indicator": { display: "none" }, // Change indicator color
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            //   color: "black",
            "&:hover": { color: themeColors.red.palette.primary.main }, // Hover effect
            "&.Mui-selected": { color: themeColors.red.palette.primary.main }, // Active tab style
          },
        }}
      >
        <Tab label={"Today's Deals"} disableRipple />
        <Tab label={"New Arrivals"} disableRipple />
        <Tab label={"Everyday Edits"} disableRipple />
      </Tabs>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {selectedTab === 0 && <TodaysDeals />}
          {selectedTab === 1 && (
            <ProductGrid
              products={products.new?.values}
              sx={{ justifyContent: 'center', alignItems: 'center', mt: 4 }}
            />
          )}
          {selectedTab === 2 && (
            <ProductGrid
              products={products.edits?.values}
              sx={{ justifyContent: 'center', alignItems: 'center', mt: 4 }}
            />
          )}
        </>
      )}
    </Box>
  );
}