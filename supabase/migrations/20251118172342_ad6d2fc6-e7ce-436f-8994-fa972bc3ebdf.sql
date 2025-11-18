-- Create storage bucket for verification videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('verification-videos', 'verification-videos', false)
ON CONFLICT (id) DO NOTHING;

-- Create policy for authenticated users to upload their own videos
CREATE POLICY "Users can upload their own verification videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'verification-videos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policy for authenticated users to access their own videos
CREATE POLICY "Users can access their own verification videos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-videos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);