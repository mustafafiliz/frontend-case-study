<template>
  <main
    class="container mx-auto flex flex-col items-center pt-20 gap-10 justify-center"
  >
    <h1 class="text-gray-900 text-3xl font-semibold">Uygulamanın Özeti</h1>

    <ul class="mt-5 flex flex-col gap-3 text-base font-medium list-disc">
      <li>
        <span class="text-xl font-semibold"
          >TECTNOLOGIES: Tailwind CSS, Vue 3, Pinia ve Composition API</span
        >
      </li>
      <li>
        Paketler, Uygulanan Paketler, Paket Hareketleri olarak 3 sayfa
        bulunuyor.
      </li>
      <li>
        Izgaralardaki sayfalama, sıralama ve arama işlemleri backend üzerinden
        yapılıyor ve sayfa geçişlerinde kalıcı oluyor.
      </li>
      <li>
        Paketler ve Uygulanan Paketler sayfasında ekleme, düzenleme, silme,
        arama, sayfalama ve sıralama yapılabiliyor. Paket hareketlerinde
        sayfalama ve sıralama ve silme yapılabiliyor.
      </li>
      <li>
        Uygulanmış Paketlerde Ekleme/düzenleme yaparken uzman seçildiğinde
        ilgili uzmana atanmış paketler arasından seçim yapılıyor. Paket
        kullanımına göre kalan muayene ve kontrol hakları doğru gösteriliyor.
      </li>
      <li class="text-red-500">
        Arama işlemlerinde 400 ms debounce uygulanıyor.
      </li>
      <li class="text-red-500">
        Uygulanmış Paketlerde Muayene ve Kontrol hakları dolduysa paket
        kullanamıyor. Aynı şekilde bitiş tarihi dolmuş ise paketi kullanamıyor.
      </li>
      <li class="text-red-500">
        Uygulanmış Paketlerde düzenleme(güncelleme) yapıldığında farklı bir
        paket ile seçimine devam ederse kullanılmış muayene ve kontrol hakları
        sıfırlanıyor.
      </li>
      <li class="text-red-500">
        Paketi kullandığında kontrol ve muayene sayıları güncelleniyor.
      </li>
      <li class="text-red-500">
        Kullanmak istediği paketi başlangıç tarihinden önce seçemiyor.
      </li>
    </ul>
  </main>
</template>
