DROP POLICY IF EXISTS "Public read videobucket" ON storage.objects;
CREATE POLICY "Public read marketing hero video" ON storage.objects
FOR SELECT TO anon, authenticated
USING (bucket_id = 'videobucket' AND name = 'eSignRight_HandsON.mp4');